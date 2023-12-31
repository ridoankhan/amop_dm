import mongoose from 'mongoose'
import { yellow, bold, underline } from 'colorette'
import config = require('./config')
import { logger } from '../modules/logger'

// Function to connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    // Connect to MongoDB using the MONGODB_URL from the config
    await mongoose.connect(config.database.url)
    // Log a success message
    logger.info(yellow(underline(bold('Connected to MongoDB'))))
  } catch (error) {
    // Handle errors and exit the process if there's an issue
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

export default connectToDatabase
