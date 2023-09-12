import mongoose, { Schema, Document } from 'mongoose'

interface InventoryDocument extends Document {
  provider: string
  customer: string
  iccid: number
  imei: number
  ip: string
  mac: string
  license: string
  mfg: string
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
    mfg: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    lastconnect: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Inventory = mongoose.model<InventoryDocument>(
  'Inventory',
  inventorySchema
)
