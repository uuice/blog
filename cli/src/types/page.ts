export interface PAGE {
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
  _url: string
  [key: string]: string | Array<string> | boolean | number
}
