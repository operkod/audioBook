import express from 'express'
import config from 'config'
import mongoose from 'mongoose'
import { createServer } from 'http'

import createRoutes from './src/core/routers'
import createSocket from './src/core/socket'
import path from 'path'

const app = express()
const server = createServer(app)
// const io = createSocket(server)
createSocket(server)

createRoutes(app)

app.use('/uploads', express.static('./uploads'));

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')));

	app.get('*', (_, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
};

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
	} catch (e: any) {
		console.log('Server Error', e.message)
		process.exit(1)
	}
}

start()
