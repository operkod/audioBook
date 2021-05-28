export type BookType = {
  _id: string
  author: string
  comments: Array<string>
  description: string
  imgUrl: string
  name: string
}
export type CommentsType = {
  _id?: string
  author: string
  text: string
}