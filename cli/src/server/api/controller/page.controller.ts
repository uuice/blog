import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PageService } from '../../core/service/page.service'
import { PAGE } from '../../../types/page'
import { LowdbUndefinedInterceptor } from '../interceptor/lowdb-undefined.interceptor'

@ApiTags('page')
@UseInterceptors(LowdbUndefinedInterceptor)
@Controller('page')
export class PageController {
  constructor(private pageService: PageService) {}

  @Get('queryList')
  @ApiOperation({
    summary: "Get the page list without 'content' | '_content' | '_toc'",
    description: ''
  })
  queryList(): Omit<PAGE, 'content' | '_content' | '_toc'>[] {
    return this.pageService.getPageList()
  }

  @Get('queryByAlias/:alias')
  @ApiOperation({
    summary: 'Get page by alias',
    description: ''
  })
  queryByAlias(@Param('alias') alias: string): PAGE | undefined {
    return this.pageService.getPageByAlias(alias)
  }

  @Get('query/:idOrTitle')
  @ApiOperation({
    summary: 'Get page by id or title',
    description: ''
  })
  query(@Param('idOrTitle') idOrTitle: string): PAGE | undefined {
    return this.pageService.getPageByIdOrTitle(idOrTitle)
  }
}
