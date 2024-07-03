import {
  Module,
  DynamicModule,
  Controller,
  Get,
  Provider,
  Render,
  ModuleMetadata
} from '@nestjs/common'
import { PageService } from '../core/service/page.service'
import { CoreModule } from '../core/core.module'
import { ViewData, mixedDataView } from '../core/helper/viewData'
import { SysConfigService } from '../core/service/sysConfig.service'
import { DbService } from '../core/service/db.service'
import { ConfigService } from '../core/service/config.service'
import { LIST_PAGE_ITEM } from '../../types/page'

function createPageController(alias) {
  @Controller(alias)
  class PageController {
    constructor(
      private readonly pageService: PageService,
      private readonly sysConfigService: SysConfigService
    ) {
      console.log('DynamicPageModule function loaded')
    }

    @Get('')
    @Render('page')
    async getPage() {
      const viewData = new ViewData()

      const page = await this.pageService.getPageByAlias(alias)
      viewData.assign('pageType', 'Page')
      viewData.assign('page', page)
      viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
      return mixedDataView(viewData).assign()
    }
  }
  return PageController
}

@Module({
  imports: [CoreModule]
})
export class DynamicPageModule {
  constructor() {
    console.log('DynamicPageModule loaded')
  }

  static forRoot(): DynamicModule {
    const providers: Provider[] = []
    const controllers: ModuleMetadata['controllers'] = []
    const configService = new ConfigService()
    const dbService = new DbService(configService)
    const pageService = new PageService(dbService)
    const pages = pageService.getPageList()
    pages.forEach((page: LIST_PAGE_ITEM) => {
      controllers.push(createPageController(page.alias))
    })
    return {
      module: DynamicPageModule,
      controllers,
      providers
    }
  }
}
