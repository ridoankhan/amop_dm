import { FastifyReply, FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import ApiError from '../../utils/errors/ApiError'
import { createInventoryItem, getAllInventory } from './inventory.service'
import { inventoryType } from './inventory.type'

export const createInventoryItemHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = request.body as inventoryType

    const inventoryItem = await createInventoryItem(data)
    reply.code(httpStatus.CREATED).send({ data: inventoryItem })
  } catch (error) {
    console.error(error)
    if (error instanceof ApiError) {
      reply.code(error.statusCode).send(error.message)
    } else {
      // Handle other types of errors
      reply.code(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error')
    }
  }
}

export const getAllInventoryHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const inventory = await getAllInventory()
    reply.code(httpStatus.OK).send(inventory)
  } catch (error) {
    console.log(error)
    reply.send(error)
  }
}
