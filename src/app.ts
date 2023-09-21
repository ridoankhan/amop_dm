import Fastify from 'fastify'
import { connectToDatabase } from './config/database.config'
import { inventoryRoutes } from './modules/inventory/inventory.route'
import errorHandlerPlugin from './middlewares/error.middleware'
import cors from '@fastify/cors'
import { blue, bold, underline } from 'colorette'

// Create a Fastify instance with logging enabled
const fastify = Fastify({
  logger: true,
})

// Register CORS (Cross-Origin Resource Sharing) to allow requests from any origin
fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
})

// Define a simple route for the root endpoint
fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to AMOP Device Management API' }
})

// Register the inventory routes with a prefix
fastify.register(inventoryRoutes, { prefix: '/api/inventory' })

// Register an error handling plugin/middleware
fastify.register(errorHandlerPlugin)

// Start the server
const PORT = process.env.PORT || 5000
const start = async () => {
  try {
    fastify.listen(
      {
        port: 5000,
        host: '0.0.0.0', // Listen on all available network interfaces
      },
      (err, address) => {
        if (err) throw err
        console.log(
          underline(blue(bold(`Listening on: http://localhost:${PORT}`)))
        )
      }
    )
    await connectToDatabase()
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
