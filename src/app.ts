import Fastify from 'fastify'
import mongoose from 'mongoose'
import { databaseConfig } from './config/database.config'
import { inventoryRoutes } from './modules/inventory/inventory.route'
import errorHandlerPlugin from './middlewares/error.middleware'
import cors from '@fastify/cors'
import { blue, yellow, red, bold, underline } from 'colorette'

const fastify = Fastify({
  logger: true,
})

mongoose
  .connect(databaseConfig.url)
  .then(() => console.log(underline(bold(yellow('Connected to MongoDB')))))
  .catch((err) => {
    console.error(red('Error connecting to MongoDB:'), err)
    process.exit(1)
  })

fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.register(inventoryRoutes, { prefix: '/api/inventory' })

fastify.register(errorHandlerPlugin)

const PORT = process.env.PORT || 3000

// Start the server
const start = async () => {
  try {
    fastify.listen(
      {
        port: 3000,
        host: '0.0.0.0',
      },
      (err, address) => {
        if (err) throw err
        console.log(
          underline(blue(bold(`Listening on: http://localhost:3000`)))
        )
      }
    )
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
