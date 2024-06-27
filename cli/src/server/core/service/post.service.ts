import { Injectable, Logger } from '@nestjs/common'
import { DbService } from './db.service'
import { ARCHIVES_DATE, LIST_POST_ITEM, POST } from '../../../types/post'
import { POST_CATEGORY } from '../../../types/post_category'
import { POST_TAG } from '../../../types/post_tag'
import { mapValues, sortBy, groupBy, omit, isEqual } from 'lodash'
import { CategoryService } from './category.service'
import { TagService } from './tag.service'

@Injectable()
export class PostService {
  constructor(
    private dbService: DbService,
    private categoryService: CategoryService,
    private tagService: TagService
  ) {}

  private readonly logger = new Logger(PostService.name)

  getPostByIdOrTitle(idOrTitle: string): POST | undefined {
    return this.dbService
      .getInstance()
      .get('posts')
      .find((item: POST) => isEqual(item.id, idOrTitle) || isEqual(item.title, idOrTitle))
      .value()
  }

  getPostByAlias(alias: string): POST | undefined {
    return this.dbService
      .getInstance()
      .get('posts')
      .find({
        alias
      })
      .value()
  }

  getRecentPosts(num: number = 5): LIST_POST_ITEM[] {
    return (
      this.dbService
        .getInstance()
        .get('posts')
        .map((item: POST) => omit(item, ['content', '_content', '_toc']))
        .sortBy('_created_timestamp')
        .take(num)
        .value() || []
    )
  }

  getPostListByCategoryIdOrTitle(categoryIdOrTitle: string): LIST_POST_ITEM[] {
    const category = this.categoryService.getCategoryByIdOrTitle(categoryIdOrTitle)
    if (!category) return []
    const postCategories =
      this.dbService
        .getInstance()
        .get('postCategories')
        .filter({
          categoryId: category.id
        })
        .value() || []
    const postIdArray = postCategories.map((item: POST_CATEGORY) => item.postId)
    return (
      this.dbService
        .getInstance()
        .get('posts')
        .filter((post: POST) => postIdArray.includes(post.id))
        .map((item: POST) => omit(item, ['content', '_content', '_toc']))
        .sortBy('_created_timestamp')
        .value() || []
    )
  }

  getPostListByTagIdOrTitle(tagIdOrTitle: string): LIST_POST_ITEM[] {
    const tag = this.tagService.getTagByIdOrTitle(tagIdOrTitle)
    if (!tag) return []
    const postTags =
      this.dbService
        .getInstance()
        .get('postTags')
        .filter({
          tagId: tag.id
        })
        .value() || []
    const postIdArray = postTags.map((item: POST_TAG) => item.postId)
    return (
      this.dbService
        .getInstance()
        .get('posts')
        .filter((post: POST) => postIdArray.includes(post.id))
        .map((item: POST) => omit(item, ['content', '_content', '_toc']))
        .sortBy('_created_timestamp')
        .value() || []
    )
  }

  getArchivesByDateYear(): ARCHIVES_DATE {
    const postList =
      this.dbService
        .getInstance()
        .get('posts')
        .map((item: POST) => omit(item, ['content', '_content', '_toc']))
        .value() || []

    const groupedByYear = groupBy(postList, (item: POST) => {
      const date = new Date(item.created_time || item.date)
      return date.getFullYear()
    })

    return mapValues(groupedByYear, (items) => sortBy(items, '_created_timestamp'))
  }
}
