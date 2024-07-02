import { Controller, Get } from '@nestjs/common'
import { ViewData, mixedDataView } from '../../core/helper/viewData'
import { SysConfigService } from '../../core/service/sysConfig.service'

@Controller('moment')
export class MomentController {
  constructor(private readonly sysConfigService: SysConfigService) {}

  @Get('')
  index() {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Moment')
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }
}
