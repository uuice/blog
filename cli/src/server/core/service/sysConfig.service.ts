import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { get } from 'lodash'

export const CWD = 'cwd'
export const DB_PATH = 'db_path'

@Injectable()
export class SysConfigService {
  constructor (private dbService: DbService) {
  }

  getSysConfig (path?: string) {
    const config = this.dbService.getInstance().get('systemConfig').value()
    return path ? get(config, path, '') : config
  }
}
