import { NestExpressApplication } from '@nestjs/platform-express'
import { shorten } from './filter/shorten'
import { console as Console } from './filter/console'
import { TagTest } from './tag/tagTest'
import { TagTest2 } from './tag/tagTest2'
import { SysConfigService } from '../core/service/sysConfig.service'
import { ConfigService, CWD } from '../core/service/config.service'
import { join } from 'node:path'
import * as nunjucks from 'nunjucks'

export function initView(app: NestExpressApplication): void {
  const sysConfigService = app.get(SysConfigService)
  const configService = app.get(ConfigService)
  const theme = sysConfigService.getSysConfig('theme')
  const cwd = configService.getItem(CWD) as string

  const viewsPath = join(cwd, 'themes', theme, 'views')
  const assetsPath = join(cwd, 'themes', theme, 'assets')
  const env = nunjucks.configure(viewsPath, {
    autoescape: true,
    watch: true,
    noCache: process.env.NODE_ENV === 'dev',
    express: app
  })

  initTmpExtend(env, app)

  app.useStaticAssets(assetsPath, { prefix: '/assets/' })
  app.setBaseViewsDir(viewsPath)
  app.engine('njk', env.render)
  app.setViewEngine('njk')

  // set renderString to app
  app.set('viewInstance', env)
}

function initTmpExtend(env, app) {
  // filter
  env.addFilter('shorten', shorten)
  env.addFilter('console', Console)
  // tags
  env.addExtension('TagTest', new TagTest(app))
  env.addExtension('TagTest2', new TagTest2(app))
}
