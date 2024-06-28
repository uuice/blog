import { Controller, Get } from '@nestjs/common'

@Controller('link')
export class LinkController {
  @Get('')
  index() {
    return 'link index'
  }
}
