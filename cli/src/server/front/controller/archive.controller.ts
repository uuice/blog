import { mixedDataView } from './../../core/helper/viewData'
import { Controller, Get, Param, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'
import { SysConfigService } from '../../core/service/sysConfig.service'
import { PostService } from '../../core/service/post.service'

@Controller('archives')
export class ArchiveController {
  constructor(
    private readonly sysConfigService: SysConfigService,
    private readonly postService: PostService
  ) {}

  @Get('')
  @Render('archive')
  index() {
    // default month
    const viewData = new ViewData()
    viewData.assign('pageType', 'Archive')
    viewData.assign('type', 'year')
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }

  @Get(':url')
  @Render('post')
  type(@Param('url') url: string) {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Post')
    viewData.assign('url', url)
    const post = this.postService.getPostByUrl(url)
    const prevPost = this.postService.getPrevPostByPostIdOrTitle(post.id)
    const nextPost = this.postService.getNextPostByPostIdOrTitle(post.id)
    viewData.assign('post', post)
    viewData.assign('prevPost', prevPost)
    viewData.assign('nextPost', nextPost)
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }
}
