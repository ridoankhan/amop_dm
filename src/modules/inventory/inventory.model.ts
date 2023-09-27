import mongoose, { Schema, Document, Model } from 'mongoose'
import toJSON from '../toJSON/toJSON'
import paginate, { QueryResult, IOptions } from '../paginate/paginate'

export interface InventoryDocument extends Document {
  provider: string
  customer: string
  iccid: number
  imei: number
  ip: string
  mac: string
  license: string
  manufacturer: string
  status: string
  lastconnect: Date
}

const inventorySchema: Schema<InventoryDocument> = new Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    iccid: {
      type: Number,
      required: true,
    },
    imei: {
      type: Number,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    mac: {
      type: String,
      required: true,
    },
    license: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    lastconnect: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

// Add plugin that converts mongoose to json
inventorySchema.plugin(toJSON)

// Add paginate plugin
inventorySchema.plugin(paginate)

export const Inventory = mongoose.model<InventoryDocument>('Inventory', inventorySchema) as Model<InventoryDocument> & {
  paginate: (filter: Record<string, any>, options: IOptions) => Promise<QueryResult>
}
