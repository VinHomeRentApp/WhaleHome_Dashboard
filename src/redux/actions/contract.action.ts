import { createAsyncThunk } from '@reduxjs/toolkit'
import { contractValueType } from '../../schema/contract.schema'
import { contract, contractHistory } from '../../types/contract.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

const token = localStorage.getItem('token')?.trim() || ''

export const getContractList = createAsyncThunk('contract/getContract', async (_, thunkAPI) => {
  const res = await http.get<ResponseSuccessful<contract[]>>('/contracts', {
    headers: { Authorization: `Bearer ${token}` },
    signal: thunkAPI.signal
  })
  return res.data.data
})

type uploadFileContractTypes = {
  id: string
  file: File
}

export const uploadFileContract = createAsyncThunk(
  '/contract/upload',
  async ({ id, file }: uploadFileContractTypes, thunkAPI) => {
    try {
      const response = await http.put<ResponseSuccessful<contract>>(`/contracts/upload/${id}`, { file })
      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const downloadFileContract = createAsyncThunk('/contract/download', async ({ id }: { id: number }, thunkAPI) => {
  try {
    const response = await http.get<ResponseSuccessful<string>>(`/contracts/download/${id}`)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createContract = createAsyncThunk('contract/createContract', async (body: contractValueType, thunkAPI) => {
  const res = await http.post<ResponseSuccessful<contractHistory>>('/contracthistories', {
    signal: thunkAPI.signal,
    price: body.price,
    description: body.description.trim(),
    expiredTime: body.expiredTime,
    users: {
      id: body.user
    }
  })
  const idcontracthistories = res.data.data.id
  const res2 = await http.post<ResponseSuccessful<contract>>(
    '/contracts',
    {
      signal: thunkAPI.signal,
      dateSign: body.dateSign,
      description: body.description.trim(),
      dateStartRent: body.dateStartRent,
      contractHistory: {
        id: idcontracthistories
      },
      appointmentId: body.appointmentId
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res2.data.data
})
