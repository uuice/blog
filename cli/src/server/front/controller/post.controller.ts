import { Controller, Get, Param, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'
import { PostService } from '../../core/service/post.service'

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get(':url')
  @Render('post')
  index(@Param('url') url: string) {
    // default month
    const viewData = new ViewData()
    viewData.assign('pageType', 'Post')
    viewData.assign('url', url)
    const post = this.postService.getPostByUrl(url)
    const prevPost = this.postService.getPrevPostByPostIdOrTitle(post.id)
    const nextPost = this.postService.getNextPostByPostIdOrTitle(post.id)
    viewData.assign('post', post)
    viewData.assign('prevPost', prevPost)
    viewData.assign('nextPost', nextPost)
    return viewData.assign()
  }
}
