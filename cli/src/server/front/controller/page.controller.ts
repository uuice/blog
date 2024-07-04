import { PageService } from './../../core/service/page.service'
import { Controller, Get, NotFoundException, Param, Render } from '@nestjs/common'
import { ViewData, mixedDataView } from '../../core/helper/viewData'
import { SysConfigService } from '../../core/service/sysConfig.service'

@Controller('page')
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private readonly sysConfigService: SysConfigService
  ) {}

  @Get(':url')
  @Render('page')
  async index(@Param('url') url: string) {
    const viewData = new ViewData()

    const page = await this.pageService.getPageByUrl(url)
    if (!page) {
      throw new NotFoundException('Page not found')
    }
    viewData.assign('pageType', 'Page')
    viewData.assign('page', page)
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }
}
