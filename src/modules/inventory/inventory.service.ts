/* eslint-disable security/detect-non-literal-regexp */
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
// const searchInventory = async (query: string): Promise<InventoryType[]> => {
//   try {
//     // Create a regular expression to perform a case-insensitive search
//     const regex = new RegExp(query, 'i')

//     // Construct a query that searches across different data types
//     const searchQuery = {
//       $or: [
//         { provider: regex },
//         { customer: regex },
//         { ip: regex },
//         { mac: regex },
//         { license: regex },
//         { manufacturer: regex },
//         { status: regex },
//         {
//           iccid: Number.isNaN(Number(query)) ? null : Number(query), // Match only if query is a number
//         },
//         {
//           imei: Number.isNaN(Number(query)) ? null : Number(query), // Match only if query is a number
//         },
//       ].filter((condition) => condition),
//     }

//     // Use the find method to search for inventory items
//     const inventory = await Inventory.find(searchQuery).exec()

//     return inventory
//   } catch (error) {
//     console.error('Error searching inventory:', error)
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error searching inventory')
//   }
// }

const searchInventory = async (query: string, options: IOptions): Promise<InventoryType[]> => {
  try {
    // Create a regular expression to perform a case-insensitive search
    const regex = new RegExp(query, 'i')

    // Construct a query that searches across different data types
    const searchQuery = {
      $or: [
        { provider: regex },
        { customer: regex },
        { ip: regex },
        { mac: regex },
        { license: regex },
        { manufacturer: regex },
        { status: regex },
        {
          iccid: Number.isNaN(Number(query)) ? null : Number(query), // Match only if query is a number
        },
        {
          imei: Number.isNaN(Number(query)) ? null : Number(query), // Match only if query is a number
        },
      ].filter((condition) => condition),
    }

    // Use the find method to search for inventory items
    const inventory: any = await Inventory.paginate(searchQuery, options)

    return inventory
  } catch (error) {
    console.error('Error searching inventory:', error)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error searching inventory')
  }
}

export { getAllInventory, createBulkInventory, createInventoryItem, searchInventory }
