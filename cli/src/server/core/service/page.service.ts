import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { PAGE } from '../../../types/page'
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

  getPageList(): Omit<PAGE, 'content' | '_content' | '_toc'>[] {
    return (
      this.dbService
        .getInstance()
        .get('pages')
        .map((item: PAGE) => omit(item, ['content', '_content', '_toc']))
        .value() || []
    )
  }
}
