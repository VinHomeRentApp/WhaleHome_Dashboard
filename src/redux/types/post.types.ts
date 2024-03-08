import { post } from '../../types/post.type'

export interface PostState {
  postList: post[]
  editingPost: post | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialPostState: PostState = {
  postList: [],
  editingPost: null,
  loading: false,
  currentRequestId: undefined
}
