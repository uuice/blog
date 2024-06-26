import { Injectable, Logger } from '@nestjs/common'
import { DbService } from './db.service'
import {
  ARCHIVES_DATE_YEAR,
  ARCHIVES_DATE_YEAR_MONTH,
  LIST_POST_ITEM,
  POST,
  POST_PAGE_QUERY
} from '../../../types/post'
import { POST_CATEGORY } from '../../../types/post_category'
import { POST_TAG } from '../../../types/post_tag'
import { isEqual, omit } from 'lodash'
import { CategoryService } from './category.service'
import { TagService } from './tag.service'
import { CATEGORY } from '../../../types/category'
import moment from 'moment'
import { TAG } from '../../../types/tag'

@Injectable()
export class PostService {
  constructor(
    private dbService: DbService,
    private categoryService: CategoryService,
    private tagService: TagService
  ) {}

  private readonly logger = new Logger(PostService.name)

  getPostList(): LIST_POST_ITEM[] {
    return (
      this.dbService
        .getInstance()
        .get('posts')
        .map((item: POST) => omit(item, ['content', '_content', '_toc']))
        // .sortBy('_created_timestamp')
        .orderBy('_created_timestamp', 'desc')
        .value() || []
    )
  }

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

  getPostByUrl(url: string): POST | undefined {
    return this.dbService
      .getInstance()
      .get('posts')
      .find({
        _url: url
      })
      .value()
  }

  getRecentPosts(num: number = 5): LIST_POST_ITEM[] {
    return (
      this.dbService
        .getInstance()
        .get('posts')
        .map((item: POST) => omit(item, ['content', '_content', '_toc']))
        // .sortBy('_created_timestamp')
        .orderBy('_created_timestamp', 'desc')
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
        // .sortBy('_created_timestamp')
        .orderBy('_created_timestamp', 'desc')
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
        // .sortBy('_created_timestamp')
        .orderBy('_created_timestamp', 'desc')
        .value() || []
    )
  }

  getArchivesByDateYear(): ARCHIVES_DATE_YEAR {
    const postList =
      this.dbService
        .getInstance()
        .get('posts')
        .map((item: POST) => omit(item, ['content', '_content', '_toc']))
        .orderBy('_created_timestamp', 'desc')
        .value() || []

    const result: ARCHIVES_DATE_YEAR = []

    postList.forEach((post: POST) => {
      const year = moment(post._created_timestamp).format('YYYY')
      const index = result.findIndex((obj) => year in obj)
      if (index < 0) {
        const obj = { [year]: [post] }
        result.push(obj)
      } else {
        result[index][year].push(post)
      }
    })
    return result
  }

  getArchivesByCategoryIdDateYear(categoryId: string): ARCHIVES_DATE_YEAR {
    const postList: LIST_POST_ITEM[] = this.getPostListByCategoryIdOrTitle(categoryId)
    const result: ARCHIVES_DATE_YEAR = []
    postList.forEach((post: LIST_POST_ITEM) => {
      const year = moment(post._created_timestamp as number).format('YYYY')
      const index = result.findIndex((obj) => year in obj)
      if (index < 0) {
        const obj = { [year]: [post] }
        result.push(obj)
      } else {
        result[index][year].push(post)
      }
    })
    return result
  }

  getArchivesByTagIdDateYear(tagId: string): ARCHIVES_DATE_YEAR {
    const postList: LIST_POST_ITEM[] = this.getPostListByTagIdOrTitle(tagId)
    const result: ARCHIVES_DATE_YEAR = []
    postList.forEach((post: LIST_POST_ITEM) => {
      const year = moment(post._created_timestamp as number).format('YYYY')
      const index = result.findIndex((obj) => year in obj)
      if (index < 0) {
        const obj = { [year]: [post] }
        result.push(obj)
      } else {
        result[index][year].push(post)
      }
    })
    return result
  }

  getArchivesByDateYearAndMonth(): ARCHIVES_DATE_YEAR_MONTH {
    const postList =
      this.dbService
        .getInstance()
        .get('posts')
        .map((item: POST) => omit(item, ['content', '_content', '_toc']))
        .orderBy('_created_timestamp', 'desc')
        .value() || []

    const result: ARCHIVES_DATE_YEAR_MONTH = []
    postList.forEach((post: POST) => {
      const year = moment(post._created_timestamp).format('YYYY')
      const month = moment(post._created_timestamp).format('MM')
      const yearIndex = result.findIndex((obj) => year in obj)
      if (yearIndex < 0) {
        // year doesn't exist
        const obj = {
          [year]: [
            {
              [month]: [post]
            }
          ]
        }
        result.push(obj)
      } else {
        // check month exists
        const monthIndex = result[yearIndex][year].findIndex((obj) => month in obj)
        if (monthIndex < 0) {
          const monthObj = {
            [month]: [post]
          }
          result[yearIndex][year].push(monthObj)
        } else {
          result[yearIndex][year][monthIndex][month].push(post)
        }
      }
    })
    return result
  }

  getArchivesByCategory(): ARCHIVES_DATE_YEAR {
    const categoryList = this.categoryService.getCategoryList()
    const result: ARCHIVES_DATE_YEAR = []

    categoryList.forEach((category: CATEGORY) => {
      result.push({
        [category.title]: this.getPostListByCategoryIdOrTitle(category.id)
      })
    })
    return result
  }

  getArchivesByTag(): ARCHIVES_DATE_YEAR {
    const tagList = this.tagService.getTagList()
    const result: ARCHIVES_DATE_YEAR = []

    tagList.forEach((tag: TAG) => {
      result.push({
        [tag.title]: this.getPostListByTagIdOrTitle(tag.id)
      })
    })
    return result
  }

  getPrevPostByPostIdOrTitle(postIdOrTitle: string): LIST_POST_ITEM | undefined {
    const postList = this.getPostList()

    const index = postList.findIndex((post: LIST_POST_ITEM) => {
      return isEqual(post.id, postIdOrTitle) || isEqual(post.title, postIdOrTitle)
    })

    return postList[index - 1]
  }

  getNextPostByPostIdOrTitle(postIdOrTitle: string): LIST_POST_ITEM | undefined {
    const postList = this.getPostList()

    const index = postList.findIndex((post: LIST_POST_ITEM) => {
      return isEqual(post.id, postIdOrTitle) || isEqual(post.title, postIdOrTitle)
    })

    return postList[index + 1]
  }

  getPageQuery(pageIndex: number, pageSize: number = 10): POST_PAGE_QUERY {
    const postList = this.getPostList()
    const pageCount = Math.ceil(postList.length / pageSize)
    const startIndex = (pageIndex - 1) * pageSize
    const endIndex = startIndex + pageSize

    return {
      pageIndex,
      pageCount,
      prevPage: pageIndex > 1 ? pageIndex - 1 : null,
      nextPage: pageIndex < pageCount ? pageIndex + 1 : null,
      pageSize,
      postList: postList.slice(startIndex, endIndex)
    }
  }
}
