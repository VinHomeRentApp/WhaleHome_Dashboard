import { createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { initialPaymentState } from '../types/payment.types'

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialPaymentState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload
        }
      )
  }
})

export default paymentSlice.reducer
