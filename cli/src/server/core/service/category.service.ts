import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { CATEGORY } from '../../../types/category'

type CATEGORY_WITH_POST_NUM = CATEGORY & {
  postNum: number
}

@Injectable()
export class CategoryService {
  constructor (private dbService: DbService) {
  }

  getCategoryList (): CATEGORY[] {
    return this.dbService.getInstance().get('categories').value()
  }

  getCategoryListWidthPostNum (): CATEGORY_WITH_POST_NUM[] {
    const list = this.dbService.getInstance().get('categories').value()
    return list.map((item: CATEGORY) => {
      const post = this.dbService.getInstance().get('postCategories').filters({
        categoryId: item.id
      }).value()
      return {
        ...item,
        postNum: post.length
      }
    })
  }
}
