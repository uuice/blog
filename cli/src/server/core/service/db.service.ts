import { Injectable } from '@nestjs/common'
import { ConfigService, DB_PATH } from './config.service'

import FileSync from 'lowdb/adapters/FileSync'
import low from 'lowdb'

@Injectable()
export class DbService {
  private db: any

  constructor(private configService: ConfigService) {
    this.initDb()
  }

  getInstance() {
    return this.db
  }

  initDb() {
    this.db = low(new FileSync(this.configService.getItem(DB_PATH) as string))
  }

  reload() {
    this.db = low(new FileSync(this.configService.getItem(DB_PATH) as string))
  }
}
