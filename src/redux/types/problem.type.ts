import { problem } from '../../types/problem.type'

export interface ProblemState {
  problemList: problem[]
  editProblem: problem | null
  loading: boolean
  currentRequestId: undefined | string
}

export const initialAreaState: ProblemState = {
  problemList: [],
  editProblem: null,
  loading: false,
  currentRequestId: undefined
}
