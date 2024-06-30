import { Controller, Get, Param, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'

@Controller('archives')
export class ArchiveController {
  @Get('')
  @Render('archive')
  index() {
    // default month
    const viewData = new ViewData()
    viewData.assign('pageType', 'Archive')
    viewData.assign('type', 'year')
    return viewData.assign()
  }

  @Get(':type')
  @Render('archive')
  type(@Param('type') type: string = 'year') {
    // default month
    const viewData = new ViewData()
    viewData.assign('pageType', 'Archive')
    viewData.assign('type', type)
    return viewData.assign()
  }
}
