import path from 'path'
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { Inventory, InventoryDocument } from '../src/modules/inventory/inventory.model'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../.env') })

const mongoDBUrl = process.env.MONGODB_URL!

// Connect to MongoDB
mongoose.connect(mongoDBUrl)

// Function to generate random Inventory data
function generateRandomInventory() {
  return {
    // provider: faker.company.name() + '.llc',
    provider: faker.helpers.arrayElement(['at&t', 'verizon']),
    customer: faker.person.fullName(),
    iccid: String(faker.number.int()),
    imei: String(faker.number.int()),
    ip: faker.internet.ipv4(),
    mac: faker.internet.mac(),
    license: faker.helpers.arrayElement(['License Expired', 'License Expires in 30 days or less']),
    // manufacturer: faker.helpers.arrayElement(['BECentral', 'CradlePoint', 'ReadyNet']),
    manufacturer: faker.helpers.arrayElement(['BEC_Technologies', 'Cradlepoint', 'ReadyNet']),
    status: faker.helpers.arrayElement(['Active', 'Suspended', 'Inactive']),
    lastconnect: faker.date.past(),
  }
}

// Insert 50,000 random Inventory records
async function seedDatabase() {
  const inventoriesToInsert = []
  const totalRecords = 1

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
