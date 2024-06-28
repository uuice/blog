import { Controller, Get, Param } from '@nestjs/common'

@Controller('post')
export class PostController {
  @Get(':idOrTitle')
  index(@Param('idOrTitle') idOrTitle: string) {
    // default month
    return `tag  ${idOrTitle}`
  }
}
