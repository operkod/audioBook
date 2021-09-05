const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const router = Router()

router.get('/user', auth, async (req, res) => {
	try {
		const userId = req.user.userId
		const userProfile = await User.findById(
			{ _id: userId },
			{ id: 1, avatar: 1, fullname: 1 }
		)
		res.json({ user: userProfile })
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
	}
})

router.post('/signup', async (req, res) => {
	try {
		const { email, password, fullname } = req.body
		const candidate = await User.findOne({ email })
		if (candidate) {
			return res
				.status(400)
				.json({ message: 'Такой пользоватьль уже сущеествуйет' })
		}
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({ email, password: hashedPassword, fullname })
		await user.save()
		const jwtToken = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
			expiresIn: '12h'
		})
		res.json({ jwtToken })
	} catch (e) {
		console.log('ERROR', e)
		res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
	}
})

router.post('/signin', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({ message: 'Пользователь не найден' })
		}
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ message: 'Неверные данные' })
		}
		const jwtToken = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
			expiresIn: '12h'
		})
		res.json({ jwtToken })
	} catch (e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
	}
})

router.post('/photo', auth, upload.single('image'), async (req, res) => {
	try {
		const imageUrl = req.file.path
		console.log(imageUrl)
		const userId = req.user.userId
		await User.findOneAndUpdate({ _id: userId }, { $set: { avatar: imageUrl } })
		const { avatar } = await User.findById({ _id: userId }, { avatar: 1 })
		res.json({ avatar })
		res.status(201).json(profile)
	} catch (e) {
		console.log(e.message)
		res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
	}
})

module.exports = router
