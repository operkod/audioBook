const { Router } = require('express')
const Book = require('../models/Book')
const Comment = require('../models/Comment')
const auth = require('../middleware/auth')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')

const getCheckedLike = (data, userId = null) => {
	return data.reduce((acc, next) => {
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

router.get('/', async (req, res) => {
	try {
		let userId = null
		const token = req.headers.authorization.split(' ')[1]
		if (token && token !== 'null') {
			userId = jwt.verify(token, config.get('jwtSecret')).userId
		}
		const { page, search } = req.query
		if (search) {
			const total = await Book.find({
				$text: { $search: search }
			}).countDocuments()
			const books = await Book.find(
				{ $text: { $search: search } },
				{ score: { $meta: 'textScore' } }
			)
				.sort({ score: { $meta: 'textScore' } })
				.skip(5 * page)
				.limit(5)
			return res
				.status(200)
				.json({ books: getCheckedLike(books, userId), total })
		}
		const total = await Book.find().countDocuments()
		const books = await Book.find()
			.skip(5 * page)
			.limit(5)

		res.status(200).json({ books: getCheckedLike(books, userId), total })
	} catch (e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
	}
})

router.post('/comment', async (req, res) => {
	try {
		const { id } = req.body
		const { comments } = await Book.findById({ _id: id })
		const allComments = await Comment.find({ _id: { $in: comments } })
		res.status(200).json(allComments)
	} catch (e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
	}
})
router.post('/addcomment', auth, async (req, res) => {
	try {
		const userId = req.user.userId
		const { bookId, text } = req.body
		const comment = new Comment({
			author: userId,
			text: text
		})
		await comment.save()
		await Book.updateOne({ _id: bookId }, { $push: { comments: comment } })
		res.status(201).json(comment)
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
	}
})

router.post('/add', async (req, res) => {
	try {
		const { name, author, description, image } = req.body

		const book = new Book({
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
})
router.post('/like', auth, async (req, res) => {
	try {
		const { id: bookId } = req.body
		const { userId } = req.user
		const book = await Book.findOne({ _id: bookId })
		if (!book) {
			return res
				.status(406)
				.json({ message: 'Что-то пошло не так попробуйте сново' })
		}
		const { _id, likes } = book
		if (likes.includes(userId)) {
			await Book.updateOne({ _id: bookId }, { $pull: { likes: userId } })
			return res.status(201).json({ bookId: _id, status: false })
		}
		await Book.updateOne({ _id: bookId }, { $addToSet: { likes: userId } })
		res.status(201).json({ bookId: _id, status: true })
	} catch (e) {
		console.log('message', e.message)
		res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
	}
})

module.exports = router
