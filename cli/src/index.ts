import pkg from '../package.json'
import { Command } from 'commander'
import { join } from 'node:path'

import { generatePosts, generatePages, generateJsons, generateSystemConfig } from './utils/generate'

import { JSONFilePreset } from 'lowdb/node'

const defaultData = { posts: [], pages: [], tags: [], categories: [] }

export default function (cwd = process.cwd()): void {
  const sourcePath = join(cwd, 'source')

  const systemConfigPath = join(cwd, 'config.yml')

  const dataBasePath = join(cwd, 'data.json')

  const pageDirPath = join(sourcePath, '_pages')
  const postDirPath = join(sourcePath, '_posts')
  const jsonDirPath = join(sourcePath, '_jsons')

  const pageTemplatePath = join(cwd, 'templates', 'page.ng')
  const postTemplatePath = join(cwd, 'templates', 'post.ng')

  const program = new Command()

  program
    .name('uuice-cli')
    .description('CLI to uuice`s blog')
    .version(pkg.version)

  program.command('test')
    .description('test')
    .argument('<string>', 'string to split')
    .option('--p', 'display just the first substring')
    .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => {
      console.log(str)
      console.log(options)
    })

  program.command('gen')
    .description('generate data json')
    .action(async (options) => {
      const postPattern = join(postDirPath, '/**/*.md')
      const postList = await generatePosts(postPattern)

      const pagePattern = join(pageDirPath, '/**/*.md')
      const pageList = await generatePages(pagePattern)

      const jsonPattern = join(jsonDirPath, '/**/*.json')
      const jsonList = await generateJsons(jsonPattern)

      const systemConfig = await generateSystemConfig(systemConfigPath)
      console.log(systemConfig)

      const data = {
        postList,
        pageList,
        jsonList,
        systemConfig
      }
      console.log(data)
    })
  program.parse()
}
