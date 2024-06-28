import { Controller, Get } from '@nestjs/common'

@Controller('moment')
export class MomentController {
  @Get('')
  index() {
    return 'moment index'
  }
}
