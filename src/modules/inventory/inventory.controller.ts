import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../../utils/constants'
import { handleServerError } from '../../utils/errors'
import { createInventoryItem, getAllInventory } from './inventory.service'

export const createInventoryItemHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = request.body
    console.log(data)
    const inventoryItem = await createInventoryItem(data)
    reply.status(STANDARD.SUCCESS).send({ data: inventoryItem })
  } catch (error) {
    handleServerError(reply, error)
  }
}

export const getAllInventoryHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const inventory = await getAllInventory()
    reply.send(inventory)
  } catch (error) {
    handleServerError(reply, error)
  }
}
