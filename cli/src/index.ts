import pkg from '../package.json'
import { Command } from 'commander'
import { join } from 'node:path'
import { stat, readFile, writeFile, mkdir } from 'node:fs/promises'
import chalk from 'chalk'
export default function (cwd = process.cwd()): void {
  const sourcePath = join(cwd, 'source')
  const systemConfigPath = join(cwd, 'config.yml')
  const dataBasePath = join(cwd, 'data.json')
  const pageDirPath = join(sourcePath, '_pages')
  const postDirPath = join(sourcePath, '_posts')
  const jsonDirPath = join(sourcePath, '_jsons')
  const ymlDirPath = join(sourcePath, '_ymls')

  const pageTemplatePath = join(cwd, 'templates', 'page.njk')
  const postTemplatePath = join(cwd, 'templates', 'post.njk')

  const pageTemplatePathDefault = join(__dirname, '../templates', 'page.njk')
  const postTemplatePathDefault = join(__dirname, '../templates', 'post.njk')

  const program = new Command()
  program.name('uuice-cli').description('CLI to uuice`s blog').version(pkg.version)
  program
    .command('new')
    .description('generate new post or page')
    .argument('<type>', 'type only support post or page')
    .argument('<title>', 'title')
    .option('-p, --path <path>', 'md file path', '')
    .action(async (type, title, options) => {
      try {
        // check template existed before creating
        const { v6: uuid } = await import('uuid')
        if (type === 'post') {
          const isExistUserTemplate = await fileExists(postTemplatePath)
          const templatePath = isExistUserTemplate ? postTemplatePath : postTemplatePathDefault
          const postPath = join(postDirPath, options.path, title + '.md')
          const templateStr = await readFile(templatePath, 'utf-8')
          const folderPath = join(postDirPath, options.path)

          if (await fileExists(postPath)) {
            console.error(`${chalk.red('[Error]')}: post ${chalk.magenta(title)} already exists`)
          } else {
            if (!(await fileExists(folderPath))) {
              await mkdir(folderPath, { recursive: true })
            }
            const nunjucks = await import('nunjucks')
            const result = nunjucks.renderString(templateStr, {
              id: uuid(),
              title,
              created_time: formatDate(),
              updated_time: formatDate()
            })

            await writeFile(postPath, result, 'utf-8')
            console.log(
              `${chalk.green('[Success]')}: post ${chalk.magenta(title)} created successfully`
            )
          }
        } else if (type === 'page') {
          const isExistUserTemplate = await fileExists(pageTemplatePath)
          const templatePath = isExistUserTemplate ? pageTemplatePath : pageTemplatePathDefault
          const pagePath = join(pageDirPath, options.path, title + '.md')
          const templateStr = await readFile(templatePath, 'utf-8')
          const folderPath = join(pageDirPath, options.path)

          if (await fileExists(pagePath)) {
            console.error(`${chalk.red('[Error]')}: page ${chalk.magenta(title)} already exists`)
          } else {
            if (!(await fileExists(folderPath))) {
              await mkdir(folderPath, { recursive: true })
            }

            const nunjucks = await import('nunjucks')
            const result = nunjucks.renderString(templateStr, {
              id: uuid(),
              title,
              created_time: formatDate(),
              updated_time: formatDate()
            })

            await writeFile(pagePath, result, 'utf-8')
            console.log(
              `${chalk.green('[Success]')}: page ${chalk.magenta(title)} created successfully`
            )
          }
        } else {
          console.error(`${chalk.red('[Error]')}: Unknown type`)
        }
      } catch (err: any) {
        console.error(`${chalk.red('[Error]')}: ${err?.message || err}`)
      }
    })

  program
    .command('gen')
    .description('generate data json')
    .option('-w, --watch', 'Listen to the source file directory')
    .action(async (options) => {
      try {
        const { generate } = await import('./utils/generate')
        console.info(`${chalk.cyan('[Info]')}: start generating`)
        console.time(`${chalk.cyan('[Info]')}: generate data json`)
        await generate(
          postDirPath,
          pageDirPath,
          jsonDirPath,
          ymlDirPath,
          systemConfigPath,
          dataBasePath
        )
        console.timeEnd(`${chalk.cyan('[Info]')}: generate data json`)
        console.info(`${chalk.green('[Success]')}: end generating`)
      } catch (err: any) {
        console.error(`${chalk.red('[Error]')}: ${err?.message || err}`)
      }
    })

  program
    .command('server')
    .description('nestjs server')
    .option('-p, --port <port>', 'server port', '3000')
    .option('-w --watch', 'Listen to data.json and reload db')
    .action(async (options) => {
      // TODO: if watch true, Listen to the source folder and regenerate the data.json file
      try {
        const { bootstrap } = await import('./server/main')
        await bootstrap({
          port: options.port,
          cwd,
          dbPath: dataBasePath
        }).then(async (app) => {
          if (options.watch) {
            const chokidar = await import('chokidar')
            console.info(`${chalk.cyan('[Info]')}: start listening on data.json`)
            const watcher = chokidar.watch(dataBasePath, {
              ignored: /node_modules/,
              persistent: true
            })

            watcher.on('change', async () => {
              console.info(
                `${chalk.cyan('[Info]')}: data.json file has been modified, reload the database...`
              )
              const { DbService } = await import('./server/core/service/db.service')
              const dbServer = app.get(DbService)
              await dbServer.reload()
              console.info(`${chalk.cyan('[Info]')}: The database is successfully reloaded.`)
            })
          }
          console.log(
            `${chalk.green('[Success]')}: server started at ${chalk.magenta(options.port)}`
          )
        })
      } catch (err: any) {
        console.error(`${chalk.red('[Error]')}: ${err?.message || err}`)
      }
    })

  program.parse()
}

async function fileExists(filePath: string) {
  try {
    await stat(filePath)
    return true
  } catch (err) {
    return false
  }
}

function formatDate(data?: string): string {
  const now = data ? new Date(data) : new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDate
}
