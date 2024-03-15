import { contract } from './contract.type'
import { post } from './post.type'
import { User } from './user.type'

export type FormAddPostModalProps = {
  postEdit: post | null
  isOpenModalAdd: boolean
  isOpenModalEdit: boolean
  setIsOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>> | null
  setIsOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>> | null
  setEditPost: React.Dispatch<React.SetStateAction<post | null>> | null
}

export type FormUserModalProps = {
  userEdit: User | null
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export type FormContractModalProps = {
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
