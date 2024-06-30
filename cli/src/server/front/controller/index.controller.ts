import { Controller, Get, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'

@Controller('')
export class IndexController {
  @Get('')
  @Render('index')
  index() {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Index')
    return viewData.assign()
  }
}
