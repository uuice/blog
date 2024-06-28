import { Controller, Get, Param } from '@nestjs/common'

@Controller('category')
export class CategoryController {
  @Get(':idOrTitle')
  index(@Param('idOrTitle') idOrTitle: string) {
    // default month
    return `category  ${idOrTitle}`
  }
}
