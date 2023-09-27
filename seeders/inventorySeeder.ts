import mongoose, { Schema, Document } from 'mongoose'
import { faker } from '@faker-js/faker'
import { Inventory, InventoryDocument } from '../src/modules/inventory/inventory.model'
import config from '../src/config/config'

// Connect to MongoDB
mongoose.connect(config.database.url)

// Function to generate random Inventory data
function generateRandomInventory() {
  return {
    provider: faker.company.name() + '.llc',
    customer: faker.person.fullName(),
    iccid: faker.number.int(),
    imei: faker.number.int(),
    ip: faker.internet.ip(),
    mac: faker.internet.mac(),
    license: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
    manufacturer: faker.helpers.arrayElement(['BECentral', 'CradlePoint', 'ReadyNet']),
    status: faker.helpers.arrayElement(['Active', 'Suspended', 'Inactive']),
    lastconnect: faker.date.past(),
  }
}

// Insert 50,000 random Inventory records
async function seedDatabase() {
  const inventoriesToInsert = []
  const totalRecords = 50000

  for (let i = 0; i < totalRecords; i++) {
    let randomInventory = generateRandomInventory()
    inventoriesToInsert.push(randomInventory)
  }

  await Inventory.insertMany(inventoriesToInsert)
}

// Seed the database
seedDatabase()
  .then(() => {
    console.log('Database seeded successfully.')
    mongoose.disconnect()
  })
  .catch((error) => {
    console.error('Error seeding database:', error)
    mongoose.disconnect()
  })
