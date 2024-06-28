import { Module } from '@nestjs/common'
import { DbService } from './service/db.service'
import { PostService } from './service/post.service'
import { TagService } from './service/tag.service'
import { CategoryService } from './service/category.service'
import { ConfigService } from './service/config.service'
import { PageService } from './service/page.service'
import { SysConfigService } from './service/sysConfig.service'
import { JsonService } from './service/json.service'
import { YmlService } from './service/yml.service'

@Module({
  providers: [
    DbService,
    PostService,
    TagService,
    CategoryService,
    ConfigService,
    PageService,
    SysConfigService,
    JsonService,
    YmlService
  ],
  exports: [
    DbService,
    PostService,
    TagService,
    CategoryService,
    ConfigService,
    PageService,
    SysConfigService,
    JsonService,
    YmlService
  ]
})
export class CoreModule {}
