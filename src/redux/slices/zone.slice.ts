import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { countBuildingByZone, createZone, deleteZone, getZoneList, updateZone } from '../actions/zone.actions'
import { initialZoneState } from '../types/zone.types'

const ZoneSlice = createSlice({
  name: 'zone',
  initialState: initialZoneState,
  reducers: {
    startEditingZone: (state, action: PayloadAction<number>) => {
      const zoneID = action.payload
      const foundZone = state.ZoneList.find((area) => area.id === zoneID) || null
      state.editingZone = foundZone
    },
    cancelEditingZone: (state) => {
      state.editingZone = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getZoneList.fulfilled, (state, action) => {
        state.ZoneList = action.payload
        state.loading = false
      })
      .addCase(countBuildingByZone.fulfilled, (state, action) => {
        state.countBuildingList = action.payload
      })
      .addCase(createZone.fulfilled, (state, action) => {
        state.ZoneList.push(action.payload)
        state.loading = false
        state.editingZone = null
      })
      .addCase(updateZone.fulfilled, (state, action) => {
        state.loading = false
        const id = action.meta.arg.id
        state.ZoneList.find((z, index) => {
          if (z.id === id) {
            state.ZoneList[index] = action.payload
            state.editingZone = null
          }
        })
      })
      .addCase(deleteZone.fulfilled, (state, action) => {
        const id = action.meta.arg
        state.ZoneList.find((z, index) => {
          if (z.id === id) {
            state.ZoneList[index] = { ...state.ZoneList[index], status: Boolean(!state.ZoneList[index]) }
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

export const { startEditingZone, cancelEditingZone } = ZoneSlice.actions

export default ZoneSlice.reducer
