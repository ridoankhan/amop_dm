import Fastify from 'fastify'
import mongoose from 'mongoose'
import { databaseConfig } from './config/database.config'
import { inventoryRoutes } from './modules/inventory/inventory.route'
import errorHandlerPlugin from './middlewares/error.middleware'

const fastify = Fastify({
  logger: true,
})

mongoose
  .connect(databaseConfig.url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
    process.exit(1)
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
        console.log(`Server listening on ${address}`)
      }
    )
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
