import mongoose, { Schema, Document } from 'mongoose'

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

export const Inventory = mongoose.model<InventoryDocument>('Inventory', inventorySchema)
