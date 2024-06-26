import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'

@Injectable()
export class JsonService {
  constructor(private dbService: DbService) {}

  /**
   * alias is the json file name
   * @param alias
   */
  getJsonByAlias(alias: string) {
    return this.dbService.getInstance().get(`${alias}Config`).value()
  }
}
