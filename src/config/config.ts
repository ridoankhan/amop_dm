import * as dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object({
  PORT: Joi.number().default(5000),
  MONGODB_URL: Joi.string()
    .required()
    .description('MONGODB URL is required to connect to datbase'),
}).unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  port: envVars.PORT,
  database: {
    url: envVars.MONGODB_URL,
  },
}

export = config
