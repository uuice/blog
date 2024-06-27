import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { get } from 'lodash'
import { JSON_OBJ } from '../../../types/json'

export const CWD = 'cwd'
export const DB_PATH = 'db_path'

@Injectable()
export class SysConfigService {
  constructor(private dbService: DbService) {}

  getSysConfig(path?: string) {
    const config = this.dbService.getInstance().get('systemConfig').value()
    if (!config) return ''
    return path ? get(config, path, '') : config
  }
}
