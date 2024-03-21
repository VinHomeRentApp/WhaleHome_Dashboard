import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { createArea, deleteArea, getArea, updateArea } from '../actions/area.actions'
import { initialAreaState } from '../types/area.types'

const areaSlice = createSlice({
  name: 'area',
  initialState: initialAreaState,
  reducers: {
    startEditingArea: (state, action: PayloadAction<number>) => {
      const areaID = action.payload
      const foundArea = state.areaList.find((area) => area.id === areaID) || null
      state.editArea = foundArea
    },
    cancelEditingArea: (state) => {
      state.editArea = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getArea.fulfilled, (state, action) => {
        state.loading = false
        state.areaList = action.payload
      })
      .addCase(updateArea.fulfilled, (state, action) => {
        const areaID = action.meta.arg.areaId
        state.areaList.find((area, index) => {
          if (area.id === areaID) {
            state.areaList[index] = action.payload
            return true
          }
          return false
        })
        state.editArea = null
      })
      .addCase(createArea.fulfilled, (state, action) => {
        state.loading = false
        state.areaList.push(action.payload)
      })
      .addCase(deleteArea.fulfilled, (state, action) => {
        const areaID = action.meta.arg
        state.areaList.find((area, index) => {
          if (area.id === areaID) {
            state.areaList[index] = { ...state.areaList[index], status: Boolean(!state.areaList[index]) }
          }
        })
        state.loading = false
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
export const { startEditingArea, cancelEditingArea } = areaSlice.actions

export default areaSlice.reducer
