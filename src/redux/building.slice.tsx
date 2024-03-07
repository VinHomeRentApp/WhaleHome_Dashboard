import { AsyncThunk, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
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

interface updateBuilding {
  id: number
  name: string
  zone: {
    id: number
    area: {
      id: number
    }
  }
}

export const getBuildingList = createAsyncThunk('building/getBuildingList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<building[]>>('/buildings', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

export const updateBuilding = createAsyncThunk(
  'building/updateBuilding',
  async ({ id, body }: { id: number; body: updateBuilding }, thunkAPI) => {
    const res = await http.put<ResponseSuccessful<building>>(`/update/${id}`, body, {
      signal: thunkAPI.signal
    })
    return res.data.data
  }
)
const BuildingSlice = createSlice({
  name: 'building',
  initialState,
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

export const { startEditBuilding, cancelEditingBuilding } = BuildingSlice.actions

export default BuildingSlice.reducer
