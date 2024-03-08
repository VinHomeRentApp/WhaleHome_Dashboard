import { issue } from '../../types/issue.type'

export interface issueState {
  issueList: issue[]
  editIssue: issue | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialIssueState: issueState = {
  issueList: [],
  editIssue: null,
  loading: false,
  currentRequestId: undefined
}
