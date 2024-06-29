import { Controller, Get, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'

@Controller('test')
export class TestController {
  @Get('')
  @Render('test')
  index() {
    const viewData = new ViewData()
    return viewData.assign()
  }
}
