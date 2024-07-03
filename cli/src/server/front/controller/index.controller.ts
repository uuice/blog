import { PostService } from './../../core/service/post.service'
import { Controller, Get, Param, ParseIntPipe, Render } from '@nestjs/common'
import { ViewData, mixedDataView } from '../../core/helper/viewData'
import { SysConfigService } from '../../core/service/sysConfig.service'

@Controller('')
export class IndexController {
  constructor(
    private readonly postService: PostService,
    private readonly sysConfigService: SysConfigService
  ) {}

  @Get('')
  @Render('index')
  index() {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Index')
    const pageQueryList = this.postService.getPageQuery(1, 10)
    viewData.assign(pageQueryList)
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }

  @Get('page/:pageIndex')
  @Render('index')
  indexWidthPageIndex(@Param('pageIndex', ParseIntPipe) pageIndex: number) {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Index')
    const pageQueryList = this.postService.getPageQuery(pageIndex, 10)
    viewData.assign(pageQueryList)
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }

  // @Get(':pageAlias')
  // @Render('page')
  // async pageItem(@Param('pageAlias') pageAlias: string) {
  //   const viewData = new ViewData()

  //   const page = await this.pageService.getPageByAlias(pageAlias)
  //   if (!page) {
  //     throw new NotFoundException('page not found')
  //   }
  //   viewData.assign('pageType', 'Page')
  //   viewData.assign('page', page)
  //   viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
  //   return mixedDataView(viewData).assign()
  // }
}
