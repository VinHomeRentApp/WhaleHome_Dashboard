import { review } from '../../types/review.type'

export interface reviewState {
  reviewList: review[]
  editReview: review | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialReviewState: reviewState = {
  reviewList: [],
  editReview: null,
  loading: false,
  currentRequestId: undefined
}
