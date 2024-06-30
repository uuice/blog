import { Controller, Get, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'

@Controller('links')
export class LinkController {
  @Get('')
  @Render('link')
  index() {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Link')
    return viewData.assign()
  }
}
