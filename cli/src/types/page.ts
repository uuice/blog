export interface PAGE {
  id: string
  title: string
  alias: string
  cover: string
  created_time: string
  updated_time: string
  categories: Array<string>
  tags: Array<string>
  excerpt: string
  published: boolean
  content: string
  _content: string
  _toc: string
  [key: string]: string | Array<string> | boolean
}
