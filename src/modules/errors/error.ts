import { FastifyInstance, FastifyError } from 'fastify'
import httpStatus from 'http-status'
import config from '../../config/config'
import { logger } from '../logger'
import ApiError from './ApiError'
import mongoose from 'mongoose'

// Error converter middleware
export const errorConverter = (error: FastifyError, request: any, reply: any) => {
  if (!(error instanceof ApiError)) {
    const isMongooseError = error instanceof mongoose.Error
    const statusCode = isMongooseError
      ? httpStatus.BAD_REQUEST // You can customize this for Mongoose errors
      : error.validation || error.validationContext
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR
    const message: string = error.message || `${httpStatus[statusCode]}`
    const newError = new ApiError(statusCode, message, false, error.stack)
    request.log.error(newError)
    error = newError
  }
  reply.send(error)
}

// Error handler middleware
export const errorHandler = (error: ApiError, request: any, reply: any) => {
  let { statusCode, message } = error
  if (config.env === 'production' && !error.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = 'Internal Server Error'
  }

  // Set response status code and error message
  reply.status(statusCode).send({
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: error.stack }),
  })
}

// Register error handling plugins
export const registerErrorHandlers = (fastify: FastifyInstance) => {
  fastify.setErrorHandler(errorConverter)
  fastify.setErrorHandler(errorHandler)
}
