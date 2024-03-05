/* eslint-disable @typescript-eslint/no-unused-vars */
import { current, PayloadAction, AsyncThunk, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../utils/http'
import { ResponseSuccessful } from '../types/response.type'
import { building } from '../types/building.type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface BuildingState {
  buildingList: building[]
  editingBuilding: building | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: BuildingState = {
  buildingList: [],
  editingBuilding: null,
  loading: false,
  currentRequestId: undefined
}

export const getBuildingList = createAsyncThunk('building/getBuildingList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<building[]>>('/buildings', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

const BuildingSlice = createSlice({
  name: 'building',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBuildingList.fulfilled, (state, action) => {
        state.buildingList = action.payload
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
  }
})

// export const { cancelEditingPost, startEditingPost } = blogSlice.actions

export default BuildingSlice.reducer
