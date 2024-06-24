import { glob } from 'glob'
import { POST } from '../types/post'
import { PAGE } from '../types/page'
import { JSON_OBJ } from '../types/json'
import { readFile } from 'node:fs/promises'
import matter from 'gray-matter'
import { parse } from 'node:path'
import { markdownToHtml, markdownToToc } from './markdown'
import * as yaml from 'js-yaml'

export const generatePages = async (path: string): Promise<PAGE[]> => {
  const jsonList = await getFileJsonList(path)
  return jsonList
}

export const generatePosts = async (path: string): Promise<POST[]> => {
  const jsonList = await getFileJsonList(path)
  return jsonList
}

export const generateJsons = async (path: string): Promise<JSON_OBJ> => {
  const jsonFileList: string[] = await glob(path, { ignore: 'node_modules/**' })
  const result: {
      [key:string]: any
  } = {}

  for (const jsonFile of jsonFileList) {
    const fileName = parse(jsonFile).name
    console.log()

    const content = await readFile(jsonFile, 'utf-8')
    result[fileName + 'Config'] = JSON.parse(content.toString())
  }

  return result
}

async function getFileJsonList (path: string): Promise<PAGE[] | POST[]> {
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
    result.push({
      ...json.data,
      id: json.data.id || '',
      title: json.data.title || '',
      cover: json.data.cover || '',
      created_time: json.data.created_time || '',
      updated_time: json.data.updated_time || '',
      categories: json.data.categories || [],
      tags: json.data.tags || [],
      excerpt: json.data.excerpt || '',
      published: json.data.published || '',
      content: json.data.content || '',
      _content: contentToc._content || '',
      _toc: contentToc._toc || ''
    })
  }
  return result
}

async function getContentToc (content: string): Promise<{ _content: string; _toc: string }> {
  return {
    _content: await markdownToHtml(content),
    _toc: await markdownToToc(content)
  }
}

export async function generateSystemConfig (path: string): Promise<JSON_OBJ> {
  // Get document, or throw exception on error
  const doc: JSON_OBJ = (yaml.load(await readFile(path, 'utf8')) as JSON_OBJ)
  console.log(doc)
  return doc
}
