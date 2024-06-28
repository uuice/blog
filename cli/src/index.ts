import pkg from '../package.json'
import { Command } from 'commander'
import { join } from 'node:path'

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

  const pageTemplatePath = join(cwd, 'templates', 'page.ng')
  const postTemplatePath = join(cwd, 'templates', 'post.ng')

  const program = new Command()

  program.name('uuice-cli').description('CLI to uuice`s blog').version(pkg.version)

  program
    .command('new')
    .description('generate new post or page')
    .argument('<type>', 'type')
    .argument('<title>', 'title')
    .option('-p, --path <port>', '指定路径', '')
    .action(async (type, title, options) => {
      // TODO: new page or post
      console.info(type, title, options)
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
    .option('-p, --port <port>', '指定端口号', '3000')
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
