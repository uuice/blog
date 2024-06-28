import { Controller, Get } from '@nestjs/common'

@Controller('archive')
export class ArchiveController {
  @Get('')
  index() {
    // default month
    return 'archive index'
  }
}
