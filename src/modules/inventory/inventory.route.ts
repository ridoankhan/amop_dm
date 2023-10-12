import { FastifyInstance } from 'fastify'
import {
  // createInventoryItemHandler,
  getAllInventoryHandler,
  createBulkInventoryHandler,
  searchInventoryHandler,
} from './inventory.controller'

const inventoryRoutes = (fastify: FastifyInstance, options: any, done: () => void) => {
  // A POST route for creating a single inventory item
  // fastify.post('/create', options, createInventoryItemHandler)

  // A POST route for creating multiple/single inventory items in bulk
  fastify.post('/create', options, createBulkInventoryHandler)

  // Register a GET route for retrieving a list of inventory items
  fastify.get('/list', options, getAllInventoryHandler)

  // route for global search
  fastify.get('/search', options, searchInventoryHandler)

  // Indicate that route registration is complete
  done()
}

export default inventoryRoutes
