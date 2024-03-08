import { apartment } from '../../types/appartment.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

const token = localStorage.getItem('key')

export const FetchPost = async (url: string) => {
  try {
    const response = await http.get<ResponseSuccessful<apartment[]>>(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.data
  } catch (error) {
    console.log(error)
  }
}
