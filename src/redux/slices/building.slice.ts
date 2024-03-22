import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { createBuilding, deleteBuilding, getBuildingList, updateBuilding } from '../actions/building.actions'
import { initialBuildingState } from '../types/building.types'

const BuildingSlice = createSlice({
  name: 'building',
  initialState: initialBuildingState,
  reducers: {
    startEditBuilding: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const index = state.buildingList.findIndex((b) => b.id == id)
      state.editingBuilding = state.buildingList[index]
    },
    cancelEditingBuilding: (state) => {
      state.editingBuilding = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getBuildingList.fulfilled, (state, action) => {
        state.buildingList = action.payload
        state.loading = false
      })
      .addCase(updateBuilding.fulfilled, (state, action) => {
        state.loading = false
        const id = action.meta.arg.id
        state.buildingList.find((b, index) => {
          if (b.id == id) {
            state.buildingList[index] = action.payload
            return true
          }
          return false
        })
      })
      .addCase(createBuilding.fulfilled, (state, action) => {
        state.buildingList.push(action.payload)
        state.loading = false
      })
      .addCase(deleteBuilding.fulfilled, (state, action) => {
        const id = action.meta.arg.id
        state.buildingList.find((z, index) => {
          if (z.id === id) {
            state.buildingList[index] = { ...state.buildingList[index], status: Boolean(!state.buildingList[index]) }
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

export const { startEditBuilding, cancelEditingBuilding } = BuildingSlice.actions

export default BuildingSlice.reducer
