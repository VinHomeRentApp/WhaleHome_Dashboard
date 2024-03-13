import { post } from './post.type'

export type FormAddPostModalProps = {
  postEdit: post | null
  isOpenModalAdd: boolean
  isOpenModalEdit: boolean
  setIsOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>
  setEditPost: React.Dispatch<React.SetStateAction<post | null>>
}
