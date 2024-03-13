import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { post } from '../../types/post.type'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { createPost, getPostList, updatePost } from '../actions/post.actions'
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
      .addCase(createPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const id = action.meta.arg.id
        state.postList.find((post, index) => {
          if (post.id === id) {
            state.postList[index] = action.payload
            return
          }
        })
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.isLoading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.isLoading && state.currentRequestId === action.meta.requestId) {
            state.isLoading = false
            state.error = null
            state.currentRequestId = undefined
          }
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload
          state.error = state.currentRequestId = action.meta.requestId
        }
      )
  }
})

export const { updatePostList, setIsLoading } = postSlice.actions
export default postSlice.reducer
