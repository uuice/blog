import { PageService } from './../../core/service/page.service'
import { Controller, Get, Param, Render } from '@nestjs/common'
import { ViewData, mixedDataView } from '../../core/helper/viewData'
import { SysConfigService } from '../../core/service/sysConfig.service'

@Controller('page')
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private readonly sysConfigService: SysConfigService
  ) {}

  @Get(':alias')
  @Render('page')
  async index(@Param('alias') alias: string) {
    const viewData = new ViewData()

    const page = await this.pageService.getPageByAlias(alias)
    viewData.assign('pageType', 'Page')
    viewData.assign('page', page)
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }
}
