import { Injectable } from '@nestjs/common'
import { ConfigService, DB_PATH } from './config.service'

import FileSync from 'lowdb/adapters/FileSync'
import low from 'lowdb'

@Injectable()
export class DbService {
  private db: any

  constructor (private configService: ConfigService) {
  }

  getInstance () {
    return this.db
  }

  initDb () {
    console.log(this.configService.getItem(DB_PATH))
    this.db = low(new FileSync(this.configService.getItem(DB_PATH) as string))
    console.log(this.db.get('systemConfig'))
    console.log(this.db.get('systemConfig').value())
  }
}
