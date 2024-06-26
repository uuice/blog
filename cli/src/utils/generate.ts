import { glob } from 'glob'
import { POST } from '../types/post'
import { PAGE } from '../types/page'
import { JSON_OBJ } from '../types/json'
import { TAG } from '../types/tag'
import { CATEGORY } from '../types/category'
import { POST_TAG } from '../types/post_tag'
import { POST_CATEGORY } from '../types/post_category'
import { readFile, writeFile } from 'node:fs/promises'
import matter from 'gray-matter'
import { join, parse } from 'node:path'
import { markdownToHtml, markdownToToc } from './markdown'
import * as yaml from 'js-yaml'
import { generateUUID } from './uuid'
import moment from 'moment'
import { titleToUrl } from './titleToUrl'

export const generate = async (
  postDirPath: string,
  pageDirPath: string,
  jsonDirPath: string,
  ymlDirPath: string,
  systemConfigPath: string,
  dataBasePath: string
) => {
  const postPattern = join(postDirPath, '/**/*.md')
  const postList = await generatePosts(postPattern)

  const pagePattern = join(pageDirPath, '/**/*.md')
  const pageList = await generatePages(pagePattern)

  const jsonPattern = join(jsonDirPath, '/**/*.json')
  const jsonList = await generateJsons(jsonPattern)

  const ymlPattern = join(ymlDirPath, '/**/*.yml')
  const ymlList = await generateYmls(ymlPattern)

  const systemConfig = await generateSystemConfig(systemConfigPath)
  const categoryTag = await generateCategoriesTags(postList, pageList)

  const data = {
    posts: postList,
    pages: pageList,
    ...jsonList,
    ...ymlList,
    systemConfig,
    tags: categoryTag.tags,
    categories: categoryTag.categories,
    postCategories: categoryTag.postCategories,
    postTags: categoryTag.postTags
  }

  // write to database file
  await writeFile(dataBasePath, JSON.stringify(data, null, 2), 'utf8')
}

async function generatePages(path: string): Promise<PAGE[]> {
  return await getFileJsonList(path)
}

async function generatePosts(path: string): Promise<POST[]> {
  return await getFileJsonList(path)
}

async function generateJsons(path: string): Promise<JSON_OBJ> {
  const jsonFileList: string[] = await glob(path, { ignore: 'node_modules/**' })
  const result: {
    [key: string]: any
  } = {}

  for (const jsonFile of jsonFileList) {
    const fileName = parse(jsonFile).name
    const content = await readFile(jsonFile, 'utf-8')
    result[fileName + 'Config'] = JSON.parse(content.toString())
  }

  return result
}

async function generateYmls(path: string): Promise<JSON_OBJ> {
  const ymlFileList: string[] = await glob(path, { ignore: 'node_modules/**' })
  const result: {
    [key: string]: any
  } = {}

  for (const jsonFile of ymlFileList) {
    const fileName = parse(jsonFile).name
    result[fileName + 'YmlConfig'] = yaml.load(await readFile(jsonFile, 'utf8')) as JSON_OBJ
  }

  return result
}

async function getFileJsonList(path: string): Promise<PAGE[] | POST[]> {
  const mdFileList: string[] = await glob(path, { ignore: 'node_modules/**' })
  const promiseList: Promise<string>[] = []
  mdFileList.forEach((file: string) => {
    const promise = readFile(file, 'utf-8') // 替换为实际的异步操作，返回一个 Promise 对象
    promiseList.push(promise)
  })

  const pageList = await Promise.all(promiseList)

  const result: POST[] | PAGE[] = []
  for (const page of pageList) {
    const json = matter(page, { excerpt: true, excerpt_separator: '<!-- more -->' })
    const contentToc = await getContentToc(json.content)
    const excerpt = json.data.excerpt || (await markdownToHtml(json.excerpt)) || ''
    result.push({
      ...json.data,
      id: json.data.id ? json.data.id.toString() : '',
      title: json.data.title || '',
      alias: json.data.alias || '',
      cover: json.data.cover || '',
      created_time: json.data.created_time || json.data.date || '',
      updated_time: json.data.updated_time || json.data.updated || '',
      categories: json.data.categories || [],
      tags: json.data.tags || [],
      excerpt,
      published: json.data.published || '',
      content: json.content || '',
      _content: contentToc._content || '',
      _toc: contentToc._toc || '',
      _url: titleToUrl(json.data.title || ''),
      _created_timestamp:
        json.data.created_time || json.data.date
          ? moment(json.data.created_time || json.data.date).valueOf()
          : 0,
      _updated_timestamp:
        json.data.updated_time || json.data.updated
          ? moment(json.data.updated_time || json.data.updated).valueOf()
          : 0,
      _symbolsCount: symbolsCount(contentToc._content || '')
    })
  }
  return result
}

async function getContentToc(content: string): Promise<{ _content: string; _toc: string }> {
  return {
    _content: await markdownToHtml(content),
    _toc: await markdownToToc(content)
  }
}

async function generateSystemConfig(path: string): Promise<JSON_OBJ> {
  // Get document, or throw exception on error
  return yaml.load(await readFile(path, 'utf8')) as JSON_OBJ
}

async function generateCategoriesTags(
  posts: POST[],
  pages: PAGE[]
): Promise<{
  tags: TAG[]
  categories: CATEGORY[]
  postCategories: POST_CATEGORY[]
  postTags: POST_TAG[]
}> {
  const tags: TAG[] = []
  const categories: CATEGORY[] = []
  const postCategories: POST_CATEGORY[] = []
  const postTags: POST_TAG[] = []

  // !pages 需不需要支持 tag 和 category 暂时不需要， 后续再定
  // !Does pages need to support tag and category? No for now. We will decide later
  posts.forEach((post) => {
    if (post.tags && post.tags.length) {
      post.tags.forEach((tag) => {
        const index = tags.findIndex((t) => t.title === tag)
        if (index !== -1) {
          postTags.push({
            postId: post.id,
            tagId: tags[index].id,
            id: generateUUID(post.id + tags[index].id)
          })
        } else {
          const id = generateUUID(tag)
          tags.push({
            id,
            title: tag,
            description: tag,
            _url: titleToUrl(tag || '')
          })
          postTags.push({
            postId: post.id,
            tagId: id,
            id: generateUUID(post.id + id)
          })
        }
      })
    }
    if (post.categories && post.categories.length) {
      post.categories.forEach((category) => {
        const index = categories.findIndex((t) => t.title === category)
        if (index !== -1) {
          postCategories.push({
            postId: post.id,
            categoryId: categories[index].id,
            id: generateUUID(post.id + categories[index].id)
          })
        } else {
          const id = generateUUID(category)
          categories.push({
            id,
            title: category,
            description: category,
            _url: titleToUrl(category || '')
          })
          postCategories.push({
            postId: post.id,
            categoryId: id,
            id: generateUUID(post.id + id)
          })
        }
      })
    }
  })
  return {
    tags,
    categories,
    postCategories,
    postTags
  }
}

function symbolsCount(input: string): number {
  if (!input) {
    return 0
  }

  return input?.trim()?.match(/\S/g)?.length || 0
}
