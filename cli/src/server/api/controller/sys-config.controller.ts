import { Controller, Get, Param } from '@nestjs/common'
import { JSON_OBJ } from '../../../types/json'
import { SysConfigService } from '../../core/service/sysConfig.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('sysConfig')
@Controller('sys-config')
export class SysConfigController {
  constructor(private sysConfigService: SysConfigService) {}

  @Get('')
  query(): JSON_OBJ {
    return this.sysConfigService.getSysConfig()
  }

  @Get(':path')
  queryWithPath(@Param('path') path: string): JSON_OBJ {
    return this.sysConfigService.getSysConfig(path)
  }
}
