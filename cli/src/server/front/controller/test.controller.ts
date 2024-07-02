import { Controller, Get, Render } from '@nestjs/common'
import { ViewData, mixedDataView } from '../../core/helper/viewData'
import { SysConfigService } from '../../core/service/sysConfig.service'

@Controller('test')
export class TestController {
  constructor(private readonly sysConfigService: SysConfigService) {}

  @Get('')
  @Render('test')
  index() {
    const viewData = new ViewData()
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }
}
