import { Module, SetMetadata } from '@nestjs/common'
import { MODULE_PATH } from '@nestjs/common/constants'
import { PostController } from './controller/post.controller'
import { TagController } from './controller/tag.controller'
import { CategoryController } from './controller/category.controller'
import { SysConfigController } from './controller/sys-config.controller'
import { JsonController } from './controller/json.controller'
import { CoreModule } from '../core/core.module'

@SetMetadata(MODULE_PATH, '/api')
@Module({
  imports: [CoreModule],
  controllers: [
    PostController,
    TagController,
    CategoryController,
    SysConfigController,
    JsonController
  ]
})
export class ApiModule {}
