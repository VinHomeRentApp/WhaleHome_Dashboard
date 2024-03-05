import { zone } from '../types/zone.type'
import { http } from '../utils/http'
import { ResponseSuccessful } from '../types/response.type'
import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface ZoneState {
  ZoneList: zone[]
  editingZone: zone | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: ZoneState = {
  ZoneList: [],
  editingZone: null,
  loading: false,
  currentRequestId: undefined
}

export const getZoneList = createAsyncThunk('zone/getZoneList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<zone[]>>('/zone', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

export const createZone = createAsyncThunk('zone/createZone', async (body: zone, thunkAPI) => {
  const response = await http.post<ResponseSuccessful<zone>>('/zone', {
    signal: thunkAPI.signal,
    name: body.name,
    area: {
      id: body.area.id
    },
    status: true
  })
  return response.data.data
})

export const updateZone = createAsyncThunk(
  'zone/updateZone',
  async ({ id, body }: { id: number; body: zone }, thunkAPI) => {
    const response = await http.put<ResponseSuccessful<zone>>(`zone/update/${id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data.data
  }
)

export const deleteZone = createAsyncThunk('zone/deleteZone', async (id: number, thunkAPI) => {
  const response = await http.put<ResponseSuccessful<zone>>(`zone/delete/${id}`, {
    signal: thunkAPI.signal
  })
  return response.data.data
})

const ZoneSlice = createSlice({
  name: 'zone',
  initialState,
  reducers: {
    startEditingZone: (state, action: PayloadAction<number>) => {
      const zoneID = action.payload
      const foundZone = state.ZoneList.find((area) => area.id === zoneID) || null
      state.editingZone = foundZone
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getZoneList.fulfilled, (state, action) => {
        state.ZoneList = action.payload
        state.loading = false
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
  }
})

export const { startEditingZone } = ZoneSlice.actions

export default ZoneSlice.reducer
