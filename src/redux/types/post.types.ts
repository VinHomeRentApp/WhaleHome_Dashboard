import { post } from '../../types/post.type'

export interface PostState {
  postList: post[]
  editingPost: post | null
  isLoading: boolean
  currentRequestId: undefined | string
}

export const initialPostState: PostState = {
  postList: [],
  editingPost: null,
  isLoading: false,
  currentRequestId: undefined
}
