const express = require('express')
const app = express()
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const server = require('http').Server(app)
const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const io = new Server(server)
const Chant = require('./models/Chat')

app.use(cors())

app.use(express.json({ extended: true }))

app.use('/uploads', express.static('uploads'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/book', require('./routes/book.routes'))

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

io.on('connection', socket => {
	socket.on('MESSAGE', async ({ token, message }) => {
		const jwtToken = token.split(' ')[1]
		if (!jwtToken) {
		}

		const { userId } = jwt.verify(token, config.get('jwtSecret'))

		const user = await User.findById(
			{ _id: userId },
			{ id: 1, avatar: 1, fullname: 1 }
		)

		console.log('decoded', userId)

		const obj = {
			author: user.fullname,
			avatar: user.avatar,
			message,
			date: new Date()
		}
		const ChatMessage = new Chant(obj)
		await ChatMessage.save()
		io.emit('NEW_MESSAGE', obj)
	}),
		socket.on('disconnect', () => {
			console.log('user disconnect')
		})
})

const PORT = process.env.PORT || 5000

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		server.listen(PORT, () =>
			console.log(`App has been started on post ${PORT}...`)
		)
	} catch (e) {
		console.log('Server Error', e.message)
		process.exit(1)
	}
}

start()
