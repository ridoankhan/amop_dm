// eslint-disable-next-line import/no-extraneous-dependencies
import pino from 'pino'
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify'

// Configure the logger as needed
const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
})

const successHandler = (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  // Log successful requests
  logger.info(`${req.method} ${req.url} ${reply.statusCode} - responseTime: ${reply.getResponseTime()} ms`)
  done()
}

const errorHandler = (req: FastifyRequest, reply: FastifyReply, error: Error, done: HookHandlerDoneFunction) => {
  // Log errors
  logger.error(
    `${req.method} ${req.url} ${reply.statusCode} - responseTime: ${reply.getResponseTime()} ms - message: ${error.message}`,
  )
  done()
}

export { successHandler, errorHandler, logger }
