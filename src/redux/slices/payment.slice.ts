import { createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { getAllPaymentByContract, getAllPayments } from '../actions/payment.actions'
import { initialPaymentState } from '../types/payment.types'

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialPaymentState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllPaymentByContract.fulfilled, (state, action) => {
        state.paymentList = action.payload
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.allPaymentList = action.payload
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload
        }
      )
  }
})

export default paymentSlice.reducer
