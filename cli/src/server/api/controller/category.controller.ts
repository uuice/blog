import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CATEGORY } from '../../../types/category'
import { CategoryService } from '../../core/service/category.service'
import { TAG } from '../../../types/tag'
import { LowdbUndefinedInterceptor } from '../interceptor/lowdb-undefined.interceptor'

@ApiTags('category')
@UseInterceptors(LowdbUndefinedInterceptor)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('queryList')
  @ApiOperation({
    summary: 'Get all the categories',
    description: ''
  })
  queryList(): CATEGORY[] {
    return this.categoryService.getCategoryList()
  }

  @Get('queryListWithPostNum')
  @ApiOperation({
    summary: 'Get all categories and count the number of articles in each category',
    description: ''
  })
  queryListWithPostNum(): TAG[] {
    return this.categoryService.getCategoryListWidthPostNum()
  }

  @Get('query/:idOrTitle')
  @ApiOperation({
    summary: 'Get category by id or title',
    description: ''
  })
  query(@Param('idOrTitle') idOrTitle: string): TAG {
    return this.categoryService.getCategoryByIdOrTitle(idOrTitle)
  }
}
