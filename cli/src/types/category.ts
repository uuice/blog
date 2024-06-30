export interface CATEGORY {
  id: string
  title: string
  description: string
  _url: string
}

export type CATEGORY_WITH_POST_NUM = CATEGORY & {
  postNum: number
}
