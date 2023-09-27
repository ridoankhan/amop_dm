class ApiError extends Error {
  statusCode: number
  code: string

  isOperational: boolean

  override stack?: string

  constructor(statusCode: number, message: string, isOperational = true, stack = '', code = '') {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.code = code
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ApiError
