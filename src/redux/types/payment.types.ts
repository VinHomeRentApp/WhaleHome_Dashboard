/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payment } from '../../types/payment.type'

export interface paymentState {
  paymentList: Payment[]
  allPaymentList: Payment[]
  isLoading: boolean
  error: any
}

export const initialPaymentState: paymentState = {
  allPaymentList: [],
  paymentList: [],
  isLoading: false,
  error: null
}
