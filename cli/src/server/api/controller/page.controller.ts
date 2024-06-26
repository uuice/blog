import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PageService } from '../../core/service/page.service'
import { PAGE } from '../../../types/page'

@ApiTags('page')
@Controller('page')
export class PageController {
  constructor(private pageService: PageService) {}

  @Get('/list')
  list(): Omit<PAGE, 'content' | '_content'>[] {
    return this.pageService.getPageList()
  }

  @Get(':idOrTitle')
  query(@Param('idOrTitle') idOrTitle: string): PAGE {
    return this.pageService.getPageByIdOrTitle(idOrTitle)
  }

  @Get('/alias/:alias')
  queryByAlias(@Param('alias') alias: string): PAGE {
    return this.pageService.getPageByAlias(alias)
  }
}
