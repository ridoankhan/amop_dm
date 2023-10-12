export interface InventoryType {
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

export interface InventorySearchResult {
  results: {
    provider: string
    customer: string
    iccid: number
    imei: number
    ip: string
    mac: string
    license: string
    manufacturer: string
    status: string
    lastconnect: string
    id: string
  }[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}
