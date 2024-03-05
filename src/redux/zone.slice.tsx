/* eslint-disable @typescript-eslint/no-unused-vars */
// import { current, PayloadAction, AsyncThunk, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { zone } from '../types/zone.type'
import { http } from '../utils/http'
import { ResponseSuccessful } from '../types/response.type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

// type PendingAction = ReturnType<GenericAsyncThunk['pending']>
// type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
// type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

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

export const getZoneList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<zone[]>>('/zone', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

const ZoneSlice = createSlice({
  name: 'zone',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getZoneList.fulfilled, (state, action) => {
      state.ZoneList = action.payload
      state.loading = false
    })
  }
})

// export const { cancelEditingPost, startEditingPost } = blogSlice.actions

export default ZoneSlice.reducer
