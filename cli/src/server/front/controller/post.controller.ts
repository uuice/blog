import { Controller, Get, NotFoundException, Param, Render } from '@nestjs/common'
import { ViewData, mixedDataView } from '../../core/helper/viewData'
import { PostService } from '../../core/service/post.service'
import { SysConfigService } from '../../core/service/sysConfig.service'

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly sysConfigService: SysConfigService
  ) {}

  @Get(':url')
  @Render('post')
  index(@Param('url') url: string) {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Post')
    viewData.assign('url', url)
    const post = this.postService.getPostByUrl(url)

    if (!post) {
      throw new NotFoundException('Post not found')
    }

    const prevPost = this.postService.getPrevPostByPostId(post.id)
    const nextPost = this.postService.getNextPostByPostId(post.id)
    viewData.assign('post', post)
    viewData.assign('prevPost', prevPost)
    viewData.assign('nextPost', nextPost)
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }
}
