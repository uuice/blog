import { Injectable } from '@nestjs/common'
import { TAG } from '../../../types/tag'
import { DbService } from './db.service'
import { isEqual } from 'lodash'

type TAG_WITH_POST_NUM = TAG & {
  postNum: number
}

@Injectable()
export class TagService {
  constructor(private dbService: DbService) {}

  getTagList(): TAG[] {
    return this.dbService.getInstance().get('tags').value()
  }

  getTagByIdOrTitle(idOrTitle: string): TAG {
    return this.dbService
      .getInstance()
      .get('tags')
      .find((item: TAG) => isEqual(item.id, idOrTitle) || isEqual(item.title, idOrTitle))
      .value()
  }

  getTagListWidthPostNum(): TAG_WITH_POST_NUM[] {
    const list = this.dbService.getInstance().get('tags').value()
    return list.map((item: TAG) => {
      const postTagList = this.dbService
        .getInstance()
        .get('postTags')
        .filter({
          tagId: item.id
        })
        .value()
      return {
        ...item,
        postNum: postTagList.length
      }
    })
  }
}
