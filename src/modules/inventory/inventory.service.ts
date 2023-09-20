import { Inventory } from './inventory.model'
import { InventoryType } from './inventory.type'

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

const createBulkInventory = async (data: InventoryType[]) => {
  try {
    const createdInventoryItems: InventoryType[] = []

    for (const itemData of data) {
      const inventoryItem = await createInventoryItem(itemData)
      createdInventoryItems.push(inventoryItem)
    }

    return createdInventoryItems
  } catch (error) {
    throw new Error('Error creating bulk inventory items')
  }
}

export { getAllInventory, createBulkInventory }
