/* eslint-disable @typescript-eslint/no-explicit-any */
import { contract } from '../../types/contract.type'

export interface contractState {
  contractList: contract[]
  editContract: contract | null
  loading: boolean
  currentRequestId: undefined | string
  error: any
}

export const initialContractState: contractState = {
  contractList: [],
  editContract: null,
  loading: false,
  currentRequestId: undefined,
  error: null
}
