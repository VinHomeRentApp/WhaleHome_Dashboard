import { contract } from './contract.type'

export type Payment = {
  id: number
  createDate: string
  payment_time: string
  content: string
  total_price: string
  contract: contract
  status: boolean
}
