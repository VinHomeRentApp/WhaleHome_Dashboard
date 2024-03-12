import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { post } from '../../types/post.type'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { getPostList } from '../actions/post.actions'
import { initialPostState } from '../types/post.types'

const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    updatePostList: (state, action: PayloadAction<post>) => {
      state.postList.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.isLoading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.isLoading && state.currentRequestId === action.meta.requestId) {
            state.isLoading = false
            state.currentRequestId = undefined
          }
        }
      )
  }
})

export const { updatePostList, setIsLoading } = postSlice.actions
export default postSlice.reducer
