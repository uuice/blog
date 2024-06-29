import pkg from '../package.json'
import { Command } from 'commander'
import { join } from 'node:path'
import { stat, readFile, writeFile, mkdir } from 'node:fs/promises'

import { generate } from './utils/generate'
import { bootstrap } from './server/main'

import { v6 as uuid } from 'uuid'
import * as nunjucks from 'nunjucks'
import moment from 'moment'
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
      // check template existed before creating
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

          const result = nunjucks.renderString(templateStr, {
            id: uuid(),
            title,
            created_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_time: moment().format('YYYY-MM-DD HH:mm:ss')
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

          const result = nunjucks.renderString(templateStr, {
            id: uuid(),
            title,
            created_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_time: moment().format('YYYY-MM-DD HH:mm:ss')
          })

          await writeFile(pagePath, result, 'utf-8')
          console.log(
            `${chalk.green('[Success]')}: page ${chalk.magenta(title)} created successfully`
          )
        }
      } else {
        console.error(`${chalk.red('[Error]')}: Unknown type`)
      }
    })

  program
    .command('gen')
    .description('generate data json')
    .action(async (options) => {
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
    })

  program
    .command('server')
    .description('koa server')
    .option('-p, --port <port>', 'server port', '3000')
    .action(async (options) => {
      try {
        await bootstrap({
          port: options.port,
          cwd,
          dbPath: dataBasePath
        }).then(() => {
          console.log(
            `${chalk.green('[Success]')}: server started at ${chalk.magenta(options.port)}`
          )
        })
      } catch (err) {
        console.error(err)
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
