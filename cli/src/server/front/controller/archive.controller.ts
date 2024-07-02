import { mixedDataView } from './../../core/helper/viewData'
import { Controller, Get, Param, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'
import { SysConfigService } from '../../core/service/sysConfig.service'

@Controller('archives')
export class ArchiveController {
  constructor(private readonly sysConfigService: SysConfigService) {}

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

  @Get(':type')
  @Render('archive')
  type(@Param('type') type: string = 'year') {
    // default month
    const viewData = new ViewData()
    viewData.assign('pageType', 'Archive')
    viewData.assign('type', type)
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }
}
