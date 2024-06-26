import { Controller, Get, Param } from '@nestjs/common'
import { JSON_OBJ } from '../../../types/json'
import { JsonService } from '../../core/service/json.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('json')
@Controller('json')
export class JsonController {
  constructor(private jsonService: JsonService) {}

  @Get(':alias')
  query(@Param('alias') alias: string): JSON_OBJ {
    return this.jsonService.getJsonByAlias(alias)
  }
}
