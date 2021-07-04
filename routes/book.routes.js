const { Router } = require('express')
const Book = require('../models/Book')
const Comment = require('../models/Comment')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', async (req, res) => {
	try {
		const aasdsada = 'asds'
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
			return res.status(200).json({ books, total })
		}
		const totalBooks = await Book.find().countDocuments()
		const collectionBooks = await Book.find()
			.skip(5 * page)
			.limit(5)
		res.status(200).json({ books: collectionBooks, total: totalBooks })
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

module.exports = router
