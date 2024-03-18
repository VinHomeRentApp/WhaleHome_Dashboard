/* eslint-disable @typescript-eslint/no-explicit-any */
import { issue } from '../../types/issue.type'

export interface paymentState {
  paymentList: issue[]
  isLoading: boolean
  error: any
}

export const initialPaymentState: paymentState = {
  paymentList: [],
  isLoading: false,
  error: null
}
