import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { LIST_PAGE_ITEM, PAGE } from '../../../types/page'
import { isEqual, omit } from 'lodash'

@Injectable()
export class PageService {
  constructor(private dbService: DbService) {}

  getPageByAlias(alias: string): PAGE | undefined {
    return this.dbService.getInstance().get('pages').find({ alias }).value()
  }

  getPageByIdOrTitle(idOrTitle: string): PAGE | undefined {
    return this.dbService
      .getInstance()
      .get('pages')
      .find((item: PAGE) => isEqual(item.id, idOrTitle) || isEqual(item.title, idOrTitle))
      .value()
  }

  getPageList(): LIST_PAGE_ITEM[] {
    return (
      this.dbService
        .getInstance()
        .get('pages')
        .map((item: PAGE) => omit(item, ['content', 'mdContent', 'toc']))
        .value() || []
    )
  }
}
