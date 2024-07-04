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
  mdContent: string
  toc: string
  created_timestamp: number
  updated_timestamp: number
  url: string
  [key: string]: string | Array<string> | boolean | number
  symbolsCount: number
}

export type LIST_PAGE_ITEM = Omit<PAGE, 'content' | 'mdContent' | 'toc'>
