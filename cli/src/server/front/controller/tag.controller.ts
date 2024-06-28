import { Controller, Get, Param } from '@nestjs/common'

@Controller('tag')
export class TagController {
  @Get(':idOrTitle')
  index(@Param('idOrTitle') idOrTitle: string) {
    // default month
    return `tag  ${idOrTitle}`
  }
}
