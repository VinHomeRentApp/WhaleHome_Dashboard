import { post, postCreateBody } from '../types/post.type'
import { ResponseSuccessful } from '../types/response.type'
import { http } from '../utils/http'

export const createPost = async (body: postCreateBody) => {
  return http.post<ResponseSuccessful<post>>(`post/create`, body)
}
