import { Injectable } from '@nestjs/common'
import { DbService } from './db.service'
import { POST } from '../../../types/post'
import { POST_CATEGORY } from '../../../types/post_category'
import { POST_TAG } from '../../../types/post_tag'
import { mapValues, sortBy, groupBy, omit } from 'lodash'
import { CategoryService } from './category.service'
import { TagService } from './tag.service'

interface ARCHIVES_DATE {
  [date: string]: Omit<POST, 'content' | '_content'>[]
}

@Injectable()
export class PostService {
  constructor(
    private dbService: DbService,
    private categoryService: CategoryService,
    private tagService: TagService
  ) {}

  getPostById(id: string): POST {
    return this.dbService
      .getInstance()
      .get('posts')
      .filter({
        id
      })
      .value()
  }

  getPostByAlias(alias: string): POST {
    return this.dbService
      .getInstance()
      .get('posts')
      .filter({
        alias
      })
      .value()
  }

  getRecentPosts(num: number = 5): POST[] {
    return this.dbService
      .getInstance()
      .get('posts')
      .map((item: POST) => omit(item, ['content', '_content']))
      .sortBy('created_time')
      .take(num)
      .value()
  }

  getPostListByCategoryIdOrTitle(categoryIdOrTitle: string) {
    const category = this.categoryService.getCategoryByIdOrTitle(categoryIdOrTitle)
    const postCategories = this.dbService
      .getInstance()
      .get('postCategories')
      .filter({
        categoryId: category.id
      })
      .value()
    const postIdArray = postCategories.map((item: POST_CATEGORY) => item.postId)
    return this.dbService
      .getInstance()
      .get('posts')
      .filter((post: POST) => postIdArray.includes(post.id))
      .map((item: POST) => omit(item, ['content', '_content']))
      .sortBy('created_time')
      .value()
  }

  getPostListByTagIdOrTitle(tagIdOrTitle: string): Omit<POST, 'content' | '_content'>[] {
    const tag = this.tagService.getTagByIdOrTitle(tagIdOrTitle)
    const postTags = this.dbService
      .getInstance()
      .get('postTags')
      .filter({
        tagId: tag.id
      })
      .value()
    const postIdArray = postTags.map((item: POST_TAG) => item.postId)
    return this.dbService
      .getInstance()
      .get('posts')
      .filter((post: POST) => postIdArray.includes(post.id))
      .map((item: POST) => omit(item, ['content', '_content']))
      .sortBy('created_time')
      .value()
  }

  getArchivesByDateYear(): ARCHIVES_DATE {
    const postList = this.dbService
      .getInstance()
      .get('posts')
      .map((item: POST) => omit(item, ['content', '_content']))
      .value()

    const groupedByYear = groupBy(postList, (item: POST) => {
      const date = new Date(item.created_time)
      return date.getFullYear()
    })

    return mapValues(groupedByYear, (items) => sortBy(items, 'created_time'))
  }
}
