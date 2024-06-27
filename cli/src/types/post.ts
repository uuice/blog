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
  _content: string
  _toc: string
  _created_timestamp: number
  _updated_timestamp: number
  [key: string]: string | Array<string> | boolean | number
}

export type LIST_POST_ITEM = Omit<POST, 'content' | '_content' | '_toc'>

export interface ARCHIVES_DATE {
  [date: string]: LIST_POST_ITEM[]
}
