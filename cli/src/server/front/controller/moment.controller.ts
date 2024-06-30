import { Controller, Get } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'

@Controller('moment')
export class MomentController {
  @Get('')
  index() {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Moment')
    return viewData.assign()
  }
}
