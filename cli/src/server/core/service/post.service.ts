import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { POST } from '../../../types/post'
import { POST_CATEGORY } from '../../../types/post_category'
import { POST_TAG } from '../../../types/post_tag'
import { mapValues, sortBy, groupBy } from 'lodash'

interface ARCHIVES_DATE {
  [date:string]: POST[]
}

@Injectable()
export class PostService {
  constructor (private dbService: DbService) {
  }

  getPostById (id: string): POST {
    return this.dbService.getInstance().get('posts').filter({
      id
    }).value()
  }

  getPostByAlias (alias: string): POST {
    return this.dbService.getInstance().get('posts').filter({
      alias
    }).value()
  }

  getRecentPosts (num: number = 5): POST[] {
    return this.dbService.getInstance().get('posts')
      .sortBy('created_time')
      .take(num).value()
  }

  getPageListByCategoryId (categoryId: string) {
    const postCategories = this.dbService.getInstance().get('postCategories').filter({
      categoryId
    }).value()
    const postIdArray = postCategories.map((item: POST_CATEGORY) => item.postId)
    return this.dbService.getInstance()
      .get('posts')
      .filter((post: POST) => postIdArray.includes(post.id))
      .sortBy('created_time')
      .value()
  }

  getPageListByTagId (tagId: string) {
    const postTags = this.dbService.getInstance().get('postTags').filter({
      tagId
    }).value()
    const postIdArray = postTags.map((item: POST_TAG) => item.postId)
    return this.dbService.getInstance()
      .get('posts')
      .filter((post: POST) => postIdArray.includes(post.id))
      .sortBy('created_time')
      .value()
  }

  getArchivesByDate (): ARCHIVES_DATE {
    const postList = this.dbService.getInstance().get('posts').value()

    const groupedByYear = groupBy(postList, (item: POST) => {
      const date = new Date(item.created_time)
      return date.getFullYear()
    })

    return mapValues(groupedByYear, items => sortBy(items, 'created_time'))
  }
}
