import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'
import { area } from '../types/area.type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface AreaState {
  areaList: area[]
  editArea: area | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: AreaState = {
  areaList: [],
  editArea: null,
  loading: false,
  currentRequestId: undefined
}

export const getArea = createAsyncThunk('area/getAreaList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<area[]>>('/areas', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

export const createArea = createAsyncThunk('area/createArea', async (name: string, thunkAPI) => {
  const response = await http.post<ResponseSuccessful<area>>('/areas', {
    signal: thunkAPI.signal,
    name: name
  })
  return response.data.data
})

export const updateArea = createAsyncThunk(
  'area/updateArea',
  async ({ areaId, body }: { areaId: number; body: Omit<area, 'id' | 'createDate'> }, thunkAPI) => {
    console.log('sss', body)

    const response = await http.put<ResponseSuccessful<area>>(`areas/update/${areaId}`, body, {
      signal: thunkAPI.signal
    })
    return response.data.data
  }
)

export const deleteArea = createAsyncThunk('area/deleteArea', async (areaid: number, thunkAPI) => {
  const response = await http.put<area>(`areas/delete/${areaid}`, {
    signal: thunkAPI.signal
  })
  return response.data
})
const areaSlice = createSlice({
  name: 'areaaaa',
  initialState,
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
  }
})
export const { startEditingArea, cancelEditingArea } = areaSlice.actions

export default areaSlice.reducer
