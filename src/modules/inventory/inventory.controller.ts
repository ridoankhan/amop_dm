import { FastifyReply, FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import ApiError from '../errors/ApiError'
import { getAllInventory, createBulkInventory, searchInventory } from './inventory.service'
import { InventoryType } from './inventory.type'
import { QueryResult, IOptions } from '../paginate'
import pick from '../../utils/pick'

/**
 * Controller method for retrieving all inventory items.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>}
 */
export const getAllInventoryHandler = async (
  request: FastifyRequest<{ Querystring: Record<string, any> }>,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const filter = pick(request.query, ['name', 'role'])
    const options: IOptions = pick(request.query, ['sortBy', 'limit', 'page', 'projectBy'])

    // Fetch all inventory items from the service with pagination
    const inventory: QueryResult = await getAllInventory(filter, options)

    // Respond with a success status code and the retrieved inventory data
    reply.code(httpStatus.OK).send(inventory)
  } catch (error) {
    console.error(error)

    // Handle errors and send appropriate responses
    if (error instanceof ApiError) {
      reply.code(error.statusCode).send(error.message)
    } else {
      reply.code(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error')
    }
  }
}

/**
 * Controller method for creating multiple inventory items in bulk.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>}
 */
export const createBulkInventoryHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    // Extract the request body data as an array of inventory items
    const data = request.body as InventoryType[]

    // Create multiple inventory items in bulk using the service
    const inventoryItems = await createBulkInventory(data)

    if (!inventoryItems) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create inventory')
    // Respond with a success status code and a message indicating successful creation
    reply.code(httpStatus.CREATED).send({ status: 'success', message: 'Records created successfully' })
  } catch (error) {
    console.error(error)

    // Handle errors and send appropriate responses
    if (error instanceof ApiError) {
      reply.code(error.statusCode).send(error.message)
    } else {
      reply.code(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error')
    }
  }
}

/**
 * Controller method for global search across all inventory columns.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>}
 */
export const searchInventoryHandler = async (
  request: FastifyRequest<{ Querystring: Record<string, any> }>,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const options: IOptions = pick(request.query, ['sortBy', 'limit', 'page', 'projectBy'])
    const { searchElement } = request.query

    // Call the service function to search for inventory items
    const inventory = await searchInventory(searchElement, options)

    // Respond with a success status code and the retrieved inventory data
    reply.code(httpStatus.OK).send(inventory)
  } catch (error) {
    console.error(error)

    // Handle errors and send appropriate responses
    if (error instanceof ApiError) {
      reply.code(error.statusCode).send(error.message)
    } else {
      reply.code(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error')
    }
  }
}
