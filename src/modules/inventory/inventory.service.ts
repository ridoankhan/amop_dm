import { Inventory } from './inventory.model'

const createInventoryItem = async (data: any) => {
  try {
    const inventory = await Inventory.create(data)
    return inventory
  } catch (error) {
    throw new Error('Error creating inventory item')
  }
}

const getAllInventory = async () => {
  try {
    const inventory = await Inventory.find().exec()
    return inventory
  } catch (error) {
    throw new Error('Error fetching inventory data')
  }
}

export { createInventoryItem, getAllInventory }
