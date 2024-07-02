import { PostService } from './../../core/service/post.service'
import { Controller, Get, NotFoundException, Param, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'
import { PageService } from '../../core/service/page.service'

@Controller('')
export class IndexController {
  constructor(
    private postService: PostService,
    private pageService: PageService
  ) {}

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

  @Get(':pageAlias')
  @Render('page')
  async pageItem(@Param('pageAlias') pageAlias: string) {
    const viewData = new ViewData()

    const page = await this.pageService.getPageByAlias(pageAlias)
    if (!page) {
      throw new NotFoundException('page not found')
    }
    viewData.assign('pageType', 'Page')
    viewData.assign('page', page)
    return viewData.assign()
  }
}
