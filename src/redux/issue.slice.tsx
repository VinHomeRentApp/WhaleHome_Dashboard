import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'
import { issue } from '../types/issue.type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface issueState {
  issueList: issue[]
  editIssue: issue | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: issueState = {
  issueList: [],
  editIssue: null,
  loading: false,
  currentRequestId: undefined
}

export const getIssueList = createAsyncThunk('issue/getIssueList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<issue[]>>('/issue', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIssueList.fulfilled, (state, action) => {
        state.issueList = action.payload
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

export default issueSlice.reducer
