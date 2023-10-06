import httpStatus from 'http-status'
import { Inventory } from './inventory.model'
import { InventoryType } from './inventory.type'
import { IOptions, QueryResult } from '../paginate/paginate'
import ApiError from '../errors/ApiError'

/**
 * Create a single inventory item in the database.
 *
 * @param {InventoryType} data - The data for the new inventory item.
 * @returns {Promise<InventoryType>} - A promise that resolves to the created inventory item.
 */
const createInventoryItem = async (data: InventoryType): Promise<InventoryType> => {
  try {
    // Create a new inventory item in the database
    const inventory = await Inventory.create(data)
    return inventory
  } catch (error) {
    // If an error occurs during creation, throw an error with a specific message
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating inventory item')
    // throw new Error('Error creating inventory item')
  }
}

/**
 * Retrieve all inventory items from the database with pagination.
 *
 * @param {Record<string, any>} filter - Filtering options.
 * @param {IOptions} options - Pagination and sorting options.
 * @returns {Promise<QueryResult>} - A promise that resolves to a paginated result of inventory items.
 */
const getAllInventory = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  try {
    // Use the paginate method to retrieve paginated results
    const inventory: QueryResult = await Inventory.paginate(filter, options)

    return inventory
  } catch (error) {
    // If an error occurs during fetching, throw an error with a specific message
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching inventory data')
  }
}
// const getAllInventory = async (): Promise<InventoryType[]> => {
//   try {
//     // Fetch all inventory items from the database
//     const inventory = await Inventory.find().exec()
//     return inventory
//   } catch (error) {
//     // If an error occurs during fetching, throw an error with a specific message
//     throw new Error('Error fetching inventory data')
//   }
// }

/**
 * Create multiple inventory items in bulk.
 *
 * @param {InventoryType[]} data - An array of data for the new inventory items.
 * @returns {Promise<InventoryType[]>} - A promise that resolves to an array of created inventory items.
 */
const createBulkInventory = async (data: InventoryType[]): Promise<InventoryType[]> => {
  try {
    const createdInventoryItems: InventoryType[] = []

    // Iterate through the data and create each inventory item
    // eslint-disable-next-line no-restricted-syntax
    for (const itemData of data) {
      const inventoryItem = await createInventoryItem(itemData)
      createdInventoryItems.push(inventoryItem)
    }

    return createdInventoryItems
  } catch (error) {
    // If an error occurs during bulk creation, throw an error with a specific message
    throw new Error('Error creating bulk inventory items')
  }
}

/**
 * Search for inventory items based on a query string.
 *
 * @param {string} query - The search query.
 * @returns {Promise<InventoryType[]>} - A promise that resolves to an array of matching inventory items.
 */
const searchInventory = async (query: string): Promise<InventoryType[]> => {
  try {
    // Construct a query using $or operator to search across multiple columns
    const searchQuery = {
      $or: [
        { provider: { $regex: new RegExp(query, 'i') } },
        { customer: { $regex: new RegExp(query, 'i') } },
        { iccid: { $regex: new RegExp(query, 'i') } },
        { imei: { $regex: new RegExp(query, 'i') } },
        { ip: { $regex: new RegExp(query, 'i') } },
        { mac: { $regex: new RegExp(query, 'i') } },
        { license: { $regex: new RegExp(query, 'i') } },
        { manufacturer: { $regex: new RegExp(query, 'i') } },
        { status: { $regex: new RegExp(query, 'i') } },
      ],
    }

    // Log the search query for debugging purposes
    console.log('Search Query:', searchQuery)

    // Use the find method to search for inventory items
    const inventory = await Inventory.find(searchQuery).exec()

    return inventory
  } catch (error) {
    console.error('Error searching inventory:', error)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error searching inventory')
  }
}

export { getAllInventory, createBulkInventory, createInventoryItem, searchInventory }
