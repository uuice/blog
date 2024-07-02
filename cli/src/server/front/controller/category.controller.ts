import { CategoryService } from './../../core/service/category.service'
import { Controller, Get, Param, Render } from '@nestjs/common'
import { ViewData, mixedDataView } from '../../core/helper/viewData'
import { SysConfigService } from '../../core/service/sysConfig.service'

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly sysConfigService: SysConfigService
  ) {}

  @Get(':url')
  @Render('category')
  index(@Param('url') url: string) {
    // default month
    const viewData = new ViewData()
    viewData.assign('pageType', 'Category')
    viewData.assign('url', url)

    const category = this.categoryService.getCategoryByUrl(url)

    viewData.assign('category', category)
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }
}
