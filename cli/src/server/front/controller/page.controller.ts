import { Controller, Get, Param } from '@nestjs/common'

@Controller('page')
export class PageController {
  @Get(':alias')
  index(@Param('alias') alias: string) {
    return `page ${alias}`
  }
}
