import pkg from '../package.json'
import { Command } from 'commander'
import { join } from 'node:path'
import { stat } from 'node:fs/promises'

import { generate } from './utils/generate'
import { bootstrap } from './server/main'

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

  console.log(pageTemplatePath)
  console.log(postTemplatePath)
  console.log(pageTemplatePathDefault)
  console.log(postTemplatePathDefault)

  const program = new Command()

  program.name('uuice-cli').description('CLI to uuice`s blog').version(pkg.version)

  program
    .command('new')
    .description('generate new post or page')
    .argument('<type>', 'type only support post or page')
    .argument('<title>', 'title')
    .option('-p, --path <port>', 'md file path', '')
    .action(async (type, title, options) => {
      // TODO: new page or post
      // check template existed before creating
      if (type === 'post') {
        const isExistUserTemplate = await fileExists(postTemplatePath)
        console.log(isExistUserTemplate)
      } else if (type === 'page') {
        const isExistUserTemplate = await fileExists(pageTemplatePath)
        console.log(isExistUserTemplate)
      } else {
        console.error('Unknown type')
      }
    })

  program
    .command('gen')
    .description('generate data json')
    .action(async (options) => {
      console.info('start generating')
      console.time('generate data json')
      await generate(
        postDirPath,
        pageDirPath,
        jsonDirPath,
        ymlDirPath,
        systemConfigPath,
        dataBasePath
      )
      console.timeEnd('generate data json')
      console.info('end generating')
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
          console.log('server started')
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
