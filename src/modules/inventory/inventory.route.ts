import { FastifyInstance } from 'fastify'
import {
  // createInventoryItemHandler,
  getAllInventoryHandler,
  createBulkInventoryHandler,
} from './inventory.controller'

export const inventoryRoutes = (
  fastify: FastifyInstance,
  options: any,
  done: () => void
) => {
  // fastify.post('/create', options, createInventoryItemHandler)
  fastify.post('/create', options, createBulkInventoryHandler)
  fastify.get('/list', options, getAllInventoryHandler)
  done()
}
