import { FastifyReply, FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import ApiError from '../../utils/errors/ApiError'
import {
  // createInventoryItem,
  getAllInventory,
  createBulkInventory,
} from './inventory.service'
import { InventoryType } from './inventory.type'

// export const createInventoryItemHandler = async (
//   request: FastifyRequest,
//   reply: FastifyReply
// ) => {
//   try {
//     const data = request.body as InventoryType

//     const inventoryItem = await createInventoryItem(data)
//     reply.code(httpStatus.CREATED).send({ data: inventoryItem })
//   } catch (error) {
//     console.error(error)
//     if (error instanceof ApiError) {
//       reply.code(error.statusCode).send(error.message)
//     } else {
//       reply.code(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error')
//     }
//   }
// }

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

export const createBulkInventoryHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = request.body as InventoryType[]

    // Call the service method to create bulk inventory items
    const inventoryItems = await createBulkInventory(data)

    reply
      .code(httpStatus.CREATED)
      .send({ status: 'success', message: 'Records created successfully' })
  } catch (error) {
    console.error(error)
    if (error instanceof ApiError) {
      reply.code(error.statusCode).send(error.message)
    } else {
      reply.code(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error')
    }
  }
}
