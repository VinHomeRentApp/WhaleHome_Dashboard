import { post } from '../../types/post.type'

export type bodyUpdatePostTypes = {
  id: number
  body: {
    title: string
    description: string
    status?: boolean
  }
}

export interface PostState {
  postList: post[]
  editingPost: post | null
  isLoading: boolean
  currentRequestId: undefined | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
}

export const initialPostState: PostState = {
  postList: [],
  editingPost: null,
  isLoading: false,
  currentRequestId: undefined,
  error: null
}
