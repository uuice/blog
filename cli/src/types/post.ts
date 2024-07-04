import { PAGE } from './page'

export interface POST {
  id: string
  title: string
  alias: string
  cover: string
  created_time: string
  date?: string
  updated_time: string
  updated?: string
  categories: Array<string>
  tags: Array<string>
  excerpt: string
  published: boolean
  content: string
  mdContent: string
  toc: string
  created_timestamp: number
  updated_timestamp: number
  url: string
  [key: string]: string | Array<string> | boolean | number
  symbolsCount: number
}

export type LIST_POST_ITEM = Omit<POST, 'content' | 'mdContent' | 'toc'>

export type ARCHIVES_DATE_YEAR = { [date: string]: LIST_POST_ITEM[] }[]

export type ARCHIVES_DATE_YEAR_MONTH = { [date: string]: ARCHIVES_DATE_YEAR }[]

export type POST_PAGE_QUERY = {
  pageIndex: number
  pageCount: number
  prevPage: number
  nextPage: number
  pageSize: number
  postList: Omit<PAGE, 'content' | 'mdContent' | 'toc'>[]
}
