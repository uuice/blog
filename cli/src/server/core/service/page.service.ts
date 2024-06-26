import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { PAGE } from '../../../types/page'

@Injectable()
export class PageService {
  constructor(private dbService: DbService) {}

  getPageById(id: string): PAGE {
    return this.dbService.getInstance().get('pages').filter({ id }).value()
  }

  getPageByAlias(alias: string): PAGE {
    return this.dbService.getInstance().get('pages').filter({ alias }).value()
  }

  getPageByTitle(title: string): PAGE {
    return this.dbService.getInstance().get('pages').filter({ title }).value()
  }

  getPageList(): PAGE[] {
    return this.dbService.getInstance().get('pages').filter().value()
  }
}
