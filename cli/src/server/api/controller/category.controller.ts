import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CATEGORY } from '../../../types/category'
import { CategoryService } from '../../core/service/category.service'
import { TAG } from '../../../types/tag'

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/list')
  list(): CATEGORY[] {
    return this.categoryService.getCategoryList()
  }

  @Get('/listWithPostNum')
  listWithPostNum(): TAG[] {
    return this.categoryService.getCategoryListWidthPostNum()
  }

  @Get(':idOrTitle')
  query(@Param('idOrTitle') idOrTitle: string): TAG {
    return this.categoryService.getCategoryByIdOrTitle(idOrTitle)
  }
}
