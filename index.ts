import express from 'express'
import config from 'config'
import mongoose from 'mongoose'
import { createServer } from 'http'

import createRoutes from './src/core/routers'
import createSocket from './src/core/socket'

const app = express()
const server = createServer(app)
// const io = createSocket(server)
createSocket(server)

createRoutes(app)

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
