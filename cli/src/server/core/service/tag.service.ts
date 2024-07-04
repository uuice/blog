import { Injectable } from '@nestjs/common'
import { TAG, TAG_WITH_POST_NUM } from '../../../types/tag'
import { DbService } from './db.service'
import { isEqual } from 'lodash'

@Injectable()
export class TagService {
  constructor(private dbService: DbService) {}

  getTagList(): TAG[] {
    return this.dbService.getInstance().get('tags').value() || []
  }

  getTagByIdOrTitle(idOrTitle: string): TAG | undefined {
    return this.dbService
      .getInstance()
      .get('tags')
      .find((item: TAG) => isEqual(item.id, idOrTitle) || isEqual(item.title, idOrTitle))
      .value()
  }

  getTagByUrl(url: string): TAG | undefined {
    return this.dbService
      .getInstance()
      .get('tags')
      .find({
        url: url
      })
      .value()
  }

  getTagListWidthPostNum(): TAG_WITH_POST_NUM[] {
    const list = this.dbService.getInstance().get('tags').value() || []
    return list.map((item: TAG) => {
      const postTagList =
        this.dbService
          .getInstance()
          .get('postTags')
          .filter({
            tagId: item.id
          })
          .value() || []
      return {
        ...item,
        postNum: postTagList.length
      }
    })
  }
}
