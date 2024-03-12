import { contract } from '../../types/contract.type'

export interface contractState {
  contractList: contract[]
  editContract: contract | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialContractState: contractState = {
  contractList: [],
  editContract: null,
  loading: false,
  currentRequestId: undefined
}
