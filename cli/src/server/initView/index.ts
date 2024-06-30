import { NestExpressApplication } from '@nestjs/platform-express'
import { shorten } from './filter/shorten'
import { console as Console } from './filter/console'
import { TagTest } from './tag/tagTest'
import { TagTest2 } from './tag/tagTest2'
import { SysConfig, SysConfigItem } from './tag/sysConfig'
import { SysConfigService } from '../core/service/sysConfig.service'
import { ConfigService, CWD } from '../core/service/config.service'
import { join } from 'node:path'
import * as nunjucks from 'nunjucks'
import { PageItem, PageList } from './tag/page'
import { CategoryItem, CategoryList } from './tag/category'
import { TagItem, TagList } from './tag/tag'
import { YmlConfig } from './tag/ymlConfig'
import { JsonConfig } from './tag/jsonConfig'
import {
  PostArchive,
  PostItem,
  PostListByCategory,
  PostListByTag,
  PostNext,
  PostPageList,
  PostPrev,
  PostRecent
} from './tag/post'
import { date } from './filter/date'
import { symbolsCount } from './filter/symbolsCount'

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
  env.addFilter('date', date)
  env.addFilter('symbolsCount', symbolsCount)
  // tags
  env.addExtension('TagTest', new TagTest(app))
  env.addExtension('TagTest2', new TagTest2(app))
  // sysConfig tags
  env.addExtension('SysConfig', new SysConfig(app))
  env.addExtension('SysConfigItem', new SysConfigItem(app))
  // page tags
  env.addExtension('PageList', new PageList(app))
  env.addExtension('PageItem', new PageItem(app))
  // category tags
  env.addExtension('CategoryList', new CategoryList(app))
  env.addExtension('CategoryItem', new CategoryItem(app))
  // tag tags
  env.addExtension('TagList', new TagList(app))
  env.addExtension('TagItem', new TagItem(app))
  // json tags
  env.addExtension('JsonConfig', new JsonConfig(app))
  // yml tags
  env.addExtension('YmlConfig', new YmlConfig(app))

  // post tags
  env.addExtension('PostPageList', new PostPageList(app))
  env.addExtension('PostItem', new PostItem(app))
  env.addExtension('PostRecent', new PostRecent(app))
  env.addExtension('PostArchive', new PostArchive(app))
  env.addExtension('PostListByCategory', new PostListByCategory(app))
  env.addExtension('PostListByTag', new PostListByTag(app))
  env.addExtension('PostPrev', new PostPrev(app))
  env.addExtension('PostNext', new PostNext(app))
}
