import { PostService } from './../../core/service/post.service'
import { CategoryService } from './../../core/service/category.service'
import { Controller, Get, Param, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get(':url')
  @Render('category')
  index(@Param('url') url: string) {
    // default month
    const viewData = new ViewData()
    viewData.assign('pageType', 'Category')
    viewData.assign('url', url)

    const category = this.categoryService.getCategoryByUrl(url)

    viewData.assign('category', category)
    return viewData.assign()
  }
}
