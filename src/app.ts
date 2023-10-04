import Fastify from 'fastify'
import { blue, bold, underline } from 'colorette'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import fastifyRateLimit from '@fastify/rate-limit'
import connectToDatabase from './config/database.config'
import inventoryRoutes from './modules/inventory/inventory.route'
import config from './config/config'
import { logger } from './modules/logger'

const fastifyMongoDbSanitizer = require('fastify-mongodb-sanitizer')
// import { ApiError, errorConverter, errorHandler } from './modules/errors'

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

fastify.register(helmet, { contentSecurityPolicy: false, global: true })

const fastifyMongodbsanitizerOptions = {
  params: true,
  query: true,
  body: true,
}

// Define a simple route for the root endpoint
fastify.register(fastifyMongoDbSanitizer, fastifyMongodbsanitizerOptions).get('/', async () => {
  return { message: 'Welcome to AMOP Device Management API' }
})

fastify.register(fastifyRateLimit, {
  max: 100, // Maximum number of requests within the time window
  timeWindow: '1 minute', // Time window for rate limiting
})

// Register the inventory routes with a prefix
fastify.register(inventoryRoutes, { prefix: '/api/inventory' })

// send back a 404 error for any unknown api request
// fastify.register((_req, _res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
// })

// // convert error to ApiError, if needed
// fastify.register(errorConverter)

// // Register the error handling plugin
// fastify.register(errorHandlingPlugin)

// Start the server
const PORT: number = config.port || 5000
const start = async () => {
  try {
    fastify.listen(
      {
        port: PORT,
        host: '0.0.0.0',
      },
      (err) => {
        if (err) throw err
        logger.info(underline(blue(bold(`Listening on: http://localhost:${PORT}`))))
      },
    )
    await connectToDatabase()
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
