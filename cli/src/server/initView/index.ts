import { NestExpressApplication } from '@nestjs/platform-express'
import * as nunjucks from 'nunjucks'
import { shorten } from './filter/shorten'
import { console as Console } from './filter/console'
import { TagTest } from './tag/tagTest'
import { TagTest2 } from './tag/tagTest2'

export function initView(app: NestExpressApplication): void {
  // const configService = app.get(ConfigService)
  // const env = nunjucks.configure(configService.get('VIEWS_PATH'), {
  //   autoescape: true,
  //   watch: true,
  //   noCache: process.env.NODE_ENV === 'dev',
  //   express: app
  // })
  //
  // initTmpExtend(env, app)
  //
  // app.useStaticAssets(configService.get('ASSETS_PATH'), { prefix: '/assets/' })
  // app.setBaseViewsDir(configService.get('VIEWS_PATH'))
  // app.engine('njk', env.render)
  // app.setViewEngine('njk')
  //
  // // set renderString to app
  // app.set('viewInstance', env)
}

function initTmpExtend(env, app) {
  // filter
  env.addFilter('shorten', shorten)
  env.addFilter('console', Console)
  // tags
  env.addExtension('TagTest', new TagTest(app))
  env.addExtension('TagTest2', new TagTest2(app))
}
