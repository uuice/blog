import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'
import { CategoryController } from './controller/category.controller'
import { CommentController } from './controller/comment.controller'
import { IndexController } from './controller/index.controller'
import { LinkController } from './controller/link.controller'
import { MomentController } from './controller/moment.controller'
import { PageController } from './controller/page.controller'
import { PhotoController } from './controller/photo.controller'
import { PostController } from './controller/post.controller'
import { RouteForwardingMiddleware } from './middleware/route-forwarding.middleware'
import { ArchiveController } from './controller/archive.controller'
import { TestController } from './controller/test.controller'
// import { CommonDataMiddleware } from './middleware/common-data.middleware'
import { APP_FILTER } from '@nestjs/core'
import { NotFoundFilter } from './filter/not-found.filter'
import { TagController } from './controller/tag.controller'

@Module({
  imports: [CoreModule],
  controllers: [
    CategoryController,
    CommentController,
    IndexController,
    LinkController,
    MomentController,
    PageController,
    PhotoController,
    PostController,
    ArchiveController,
    TagController,
    TestController
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter
    }
  ]
})
export class FrontModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...[RouteForwardingMiddleware]).forRoutes('*')
  }
}
