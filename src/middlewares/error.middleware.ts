import { FastifyPluginCallback } from 'fastify'

const errorHandlerPlugin: FastifyPluginCallback = (fastify, options, done) => {
  // Set a custom error handler for the entire Fastify instance
  fastify.setErrorHandler((error, request, reply) => {
    // Log the error for debugging purposes
    console.error('Error:', error)

    // Handle the error and send an appropriate response to the client
    if (error.validation) {
      // Handle validation errors
      reply
        .status(400)
        .send({ error: 'Validation error', details: error.validation })
    } else {
      // Handle other types of errors
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })

  done()
}

export default errorHandlerPlugin
