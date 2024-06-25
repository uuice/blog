import { Injectable } from '@nestjs/common'
import { TAG } from '../../../types/tag'
import { DbService } from './db.service'

type TAG_WITH_POST_NUM = TAG & {
  postNum: number
}

@Injectable()
export class TagService {
  constructor (private dbService: DbService) {
  }

  getTagList (): TAG[] {
    return this.dbService.getInstance().get('tags').value()
  }

  getTagListWidthPostNum (): TAG_WITH_POST_NUM[] {
    const list = this.dbService.getInstance().get('tags').value()
    return list.map((item: TAG) => {
      const post = this.dbService.getInstance().get('postTags').filters({
        tagId: item.id
      }).value()
      return {
        ...item,
        postNum: post.length
      }
    })
  }
}
