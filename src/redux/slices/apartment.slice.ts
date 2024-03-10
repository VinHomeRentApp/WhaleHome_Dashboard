import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialApartmentState } from '../types/apartment.type'
import { getApartmentList } from '../actions/apartment.actions'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState: initialApartmentState,
  reducers: {
    startEditingApartment: (state, action: PayloadAction<number>) => {
      const ID = action.payload
      const found = state.apartmentList.find((area) => area.id === ID) || null
      state.editApartment = found
    },
    cancelEditingApartment: (state) => {
      state.editApartment = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getApartmentList.fulfilled, (state, action) => {
        state.apartmentList = action.payload
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

export const { startEditingApartment, cancelEditingApartment } = apartmentSlice.actions

export default apartmentSlice.reducer
