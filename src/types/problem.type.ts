import { issue } from './issue.type'

export interface problem {
  id: number
  createDate: string
  status: boolean
  title: string
  description: string
  issues: issue[]
  problemImages: problemImages[]
}

export interface problemImages {
  file: string
}
