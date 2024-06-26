import { Injectable } from '@nestjs/common'

interface CONFIG {
  [key: string]: string | number | boolean | object
}

export const CWD = 'cwd'
export const DB_PATH = 'db_path'

@Injectable()
export class ConfigService {
  constructor() {}

  config: CONFIG = {}

  getItem(key: string) {
    return this.config[key]
  }

  setItem(key: string, value: string | number | boolean | object) {
    this.config[key] = value
  }

  // getSysConfig (key?: string) {
  //   const config = this.dbService.getInstance().get('systemConfig').value()
  //   return key ? config[key] : config
  // }
}
