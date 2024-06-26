import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { CATEGORY, CATEGORY_WITH_POST_NUM } from '../../../types/category'
import { isEqual } from 'lodash'

@Injectable()
export class CategoryService {
  constructor(private dbService: DbService) {}

  getCategoryList(): CATEGORY[] {
    return this.dbService.getInstance().get('categories').value() || []
  }

  getCategoryByIdOrTitle(idOrTitle: string): CATEGORY | undefined {
    return this.dbService
      .getInstance()
      .get('categories')
      .find((item: CATEGORY) => isEqual(item.id, idOrTitle) || isEqual(item.title, idOrTitle))
      .value()
  }

  getCategoryByUrl(url: string): CATEGORY | undefined {
    return this.dbService
      .getInstance()
      .get('categories')
      .find({
        _url: url
      })
      .value()
  }

  getCategoryListWidthPostNum(): CATEGORY_WITH_POST_NUM[] {
    const list = this.dbService.getInstance().get('categories').value() || []
    return list.map((item: CATEGORY) => {
      const postCategoryList =
        this.dbService
          .getInstance()
          .get('postCategories')
          .filter({
            categoryId: item.id
          })
          .value() || []
      return {
        ...item,
        postNum: postCategoryList.length
      }
    })
  }
}
