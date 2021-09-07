import { Request, Response } from "express";
import BookModel from "../models/Book";
import CommentModel from "../models/Comment";
import isAuth from '../helpers/isAuth'
import jwt from 'jsonwebtoken'

type QueryType = {
  page: number,
  search: string,
  limit: number
}

const getCheckedLike = (data: any, userId = null) => {
  return data.reduce((acc: any, next: any) => {
    let book = { ...next._doc }
    if (book.likes.includes(userId)) {
      book = { ...book, likes: { count: next.likes.length, status: true } }
    } else {
      book = {
        ...book,
        likes: { count: next.likes.length, status: false }
      }
    }
    acc.push(book)
    return acc
  }, [])
}

class Book {
  find = async (req: Request<any, any, any, QueryType>, res: Response) => {
    try {
      let userId = null
      const token = req.headers.authorization?.split(' ')[1]
      if (token && token !== 'null') {
        //@ts-ignore
        userId = jwt.verify(token, 'Operkod')?.userId
      }
      const option = {
        page: 0,
        search: '',
        limit: 5
      }
      const query = req.query
      const queryOptions = { ...option, ...query }
      const { limit, page, search } = queryOptions
      if (search) {
        const total = await BookModel.find({
          $text: { $search: search }
        }).countDocuments()

        const books = await BookModel.find({ $text: { $search: search }, })
          .sort({ score: { $meta: 'textScore' } })
          .skip(limit * page)
          .limit(limit)

        return res
          .status(200)
          .json({ books: getCheckedLike(books, userId), total })
      }
      const total = await BookModel.countDocuments()
      const books = await BookModel.find()
        .skip(limit * page)
        .limit(limit)

      res.status(200).json({ books: getCheckedLike(books, userId), total })
    } catch (e: any) {
      res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
    }
  }

  comment = async (req: Request<any, any, any, { id: string }>, res: Response) => {
    try {
      const id = req.query.id
      // @ts-ignore
      const { comments } = await BookModel.findById({ _id: id })
      const allComments = await CommentModel.find({ _id: { $in: comments }, })
      res.status(200).json(allComments)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
    }
  }

  add = async (req: Request, res: Response) => {
    try {
      const { name, author, description, image } = req.body
      const book = new BookModel({
        name,
        author,
        imgUrl: image,
        description
      })
      await book.save()
      res.status(201).json({ massage: 'success' })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
    }
  }

  addLike = async (req: Request, res: Response) => {
    if (!isAuth(req)) {
      return res.status(401).json({
        message: 'Только авторизованный пользователь может ставить лайки'
      })
    }
    try {
      const { id: bookId } = req.body
      // @ts-ignore
      const token = req.headers?.authorization.split(' ')[1]
      // @ts-ignore
      const { userId } = jwt.verify(token, 'Operkod')
      const book = await BookModel.findOne({ _id: bookId })
      if (!book) {
        return res
          .status(406)
          .json({ message: 'Что-то пошло не так попробуйте сново' })
      }
      const { likes } = book
      if (likes.includes(userId)) {
        await BookModel.updateOne({ _id: bookId }, { $pull: { likes: userId } })
        return res.status(201).json({
          count: likes.length > 1 ? (likes.length -= 1) : 0,
          status: false
        })
      }
      await BookModel.updateOne({ _id: bookId }, { $addToSet: { likes: userId } })
      res.status(201).json({ count: (likes.length += 1), status: true })
    } catch (e: any) {
      console.log(e?.message)
      res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
    }
  }

  addComment = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId: string = req.user.userId
      const { bookId, text } = req.body
      const comment = new CommentModel({
        author: userId,
        text: text
      })
      await comment.save()
      // @ts-ignore
      await BookModel.updateOne({ _id: bookId }, { $push: { comments: comment } })
      res.status(201).json(comment)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
    }
  }
}

export default Book