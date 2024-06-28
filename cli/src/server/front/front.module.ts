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
    ArchiveController
  ]
})
export class FrontModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RouteForwardingMiddleware).forRoutes('*')
  }
}
