import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { JSON_OBJ } from '../../../types/json'

@Injectable()
export class YmlService {
  constructor(private dbService: DbService) {}

  /**
   * alias is the json file name
   * @param alias
   */
  getYmlByAlias(alias: string): JSON_OBJ | undefined {
    return this.dbService.getInstance().get(`${alias}YmlConfig`).value()
  }
}
