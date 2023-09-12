import Fastify from 'fastify'
import mongoose from 'mongoose'
import { databaseConfig } from './config/database.config'
// import { inventoryRoutes } from './modules/inventory/inventory.route'
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

// fastify.register(userRoutes, { prefix: '/api/users' })
// fastify.register(inventoryRoutes, { prefix: '/api/inventory' })

fastify.register(errorHandlerPlugin)

const PORT = process.env.PORT || 3000

// key = 'hello_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_world'

// Start the server
const start = async () => {
  try {
    await fastify.listen(PORT)
    fastify.log.info(
      // `Server is running on port ${fastify.server.address()?.port}`
      `server is running`
    )
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
