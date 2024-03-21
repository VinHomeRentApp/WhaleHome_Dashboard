import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialApartmentState } from '../types/apartment.type'
import { createApartment, deleteApartment, getApartmentList, updateApartment } from '../actions/apartment.actions'
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
      .addCase(updateApartment.fulfilled, (state, action) => {
        const id = action.meta.arg.id
        state.apartmentList.find((a, index) => {
          if (a.id == id) {
            state.apartmentList[index] = action.payload
            return true
          }
          return false
        })
      })
      .addCase(deleteApartment.fulfilled, (state, action) => {
        const id = action.meta.arg
        state.apartmentList.find((a, index) => {
          if (a.id === id) {
            state.apartmentList[index] = { ...state.apartmentList[index], status: Boolean(!state.apartmentList[index]) }
          }
        })
      })
      .addCase(createApartment.fulfilled, (state, action) => {
        state.apartmentList.push(action.payload)
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
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false
          state.error = action.payload
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false
          state.error = null
        }
      )
  }
})

export const { startEditingApartment, cancelEditingApartment } = apartmentSlice.actions

export default apartmentSlice.reducer
