import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { PAGE } from '../../../types/page'
import { isEqual, omit } from 'lodash'

@Injectable()
export class PageService {
  constructor(private dbService: DbService) {}

  getPageByAlias(alias: string): PAGE {
    return this.dbService.getInstance().get('pages').filter({ alias }).value()
  }

  getPageByIdOrTitle(idOrTitle: string): PAGE {
    return this.dbService
      .getInstance()
      .get('pages')
      .find((item: PAGE) => isEqual(item.id, idOrTitle) || isEqual(item.title, idOrTitle))
      .value()
  }

  getPageList(): Omit<PAGE, 'content' | '_content'>[] {
    return this.dbService
      .getInstance()
      .get('pages')
      .map((item: PAGE) => omit(item, ['content', '_content']))
      .value()
  }
}
