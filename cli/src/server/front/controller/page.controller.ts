import { PageService } from './../../core/service/page.service'
import { Controller, Get, Param } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'

@Controller('page')
export class PageController {
  constructor(private pageService: PageService) {}

  @Get(':alias')
  async index(@Param('alias') alias: string) {
    const viewData = new ViewData()

    const page = await this.pageService.getPageByAlias(alias)
    viewData.assign('pageType', 'Page')
    viewData.assign('page', page)
    return viewData.assign()
  }
}
