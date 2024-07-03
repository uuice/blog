import { Injectable } from '@nestjs/common'
import { CONFIG } from '../../../types/config'
import { join } from 'node:path'

export const CWD = 'cwd'
export const DB_PATH = 'db_path'
export const ROUTER_FORWARDING = 'router_forwarding'

@Injectable()
export class ConfigService {
  constructor() {
    const cwd = process.cwd()
    const dataBasePath = join(cwd, 'data.json')
    this.setItem(CWD, cwd)
    this.setItem(DB_PATH, dataBasePath)
    this.setItem(ROUTER_FORWARDING, {})
  }

  config: CONFIG = {}

  routes: Record<string, string>

  getItem(key: string) {
    return this.config[key]
  }

  setItem(key: string, value: string | number | boolean | object) {
    this.config[key] = value
  }
}
