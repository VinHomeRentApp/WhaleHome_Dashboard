import { createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { initialContractState } from '../types/contract.type'
import { createContract, getContractList } from '../actions/contract.action'

const contractSlice = createSlice({
  name: 'contract',
  initialState: initialContractState,
  reducers: {},
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
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
  }
})

export default contractSlice.reducer
