import { PostService } from './../../core/service/post.service'
import { Controller, Get, Param, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'

@Controller('')
export class IndexController {
  constructor(private postService: PostService) {}

  @Get('')
  @Render('index')
  index() {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Index')
    const pageQueryList = this.postService.getPageQuery(1, 10)
    viewData.assign(pageQueryList)
    return viewData.assign()
  }

  @Get('page/:pageIndex')
  @Render('index')
  indexWidthPageIndex(@Param('pageIndex') pageIndex: number) {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Index')
    const pageQueryList = this.postService.getPageQuery(pageIndex, 10)
    viewData.assign(pageQueryList)
    return viewData.assign()
  }
}
