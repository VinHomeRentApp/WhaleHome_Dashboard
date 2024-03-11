import { createSlice } from '@reduxjs/toolkit'
import { initialApartmentClassState } from '../types/apartmentClass.type'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { getApartmentClassList } from '../actions/apartmentClass.action'

const apartmentClassSlice = createSlice({
  name: 'apartmentClass',
  initialState: initialApartmentClassState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getApartmentClassList.fulfilled, (state, action) => {
        state.apartmentClassList = action.payload
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

export default apartmentClassSlice.reducer
