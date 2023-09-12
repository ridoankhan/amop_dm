import { FastifyInstance } from 'fastify'
import {
  createInventoryItemHandler,
  getAllInventoryHandler,
} from './inventory.controller'

export const inventoryRoutes = (
  fastify: FastifyInstance,
  options: any,
  done: () => void
) => {
  fastify.post('', options, createInventoryItemHandler)
  fastify.get('/list', options, getAllInventoryHandler)
  done()
}
