import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'

export const CWD = 'cwd'
export const DB_PATH = 'db_path'

@Injectable()
export class SysConfigService {
  constructor (private dbService: DbService) {
  }

  getSysConfig (key?: string) {
    const config = this.dbService.getInstance().get('systemConfig').value()
    return key ? config[key] : config
  }
}
