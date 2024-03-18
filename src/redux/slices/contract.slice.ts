import { createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { createContract, getContractList } from '../actions/contract.action'
import { initialContractState } from '../types/contract.type'

const contractSlice = createSlice({
  name: 'contract',
  initialState: initialContractState,
  reducers: {
    setIsLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getContractList.fulfilled, (state, action) => {
        state.contractList = action.payload
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.contractList.push(action.payload)
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false
          state.error = action.payload
        }
      )
  }
})

export const { setIsLoading } = contractSlice.actions
export default contractSlice.reducer
