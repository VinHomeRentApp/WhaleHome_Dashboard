import { createAsyncThunk } from '@reduxjs/toolkit'
import { HttpStatusCode } from 'axios'
import { contractValueType } from '../../schema/contract.schema'
import { contract, contractHistory } from '../../types/contract.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const getContractList = createAsyncThunk('contract/getContract', async (_, thunkAPI) => {
  const res = await http.get<ResponseSuccessful<contract[]>>('/contracts', {
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
  const token = localStorage.getItem('token') || ''
  try {
    const res = await http.post<ResponseSuccessful<contractHistory>>(
      '/contracthistories',
      {
        price: body.price,
        description: body.description.trim(),
        expiredTime: body.expiredTime,
        users: {
          id: body.user
        }
      },
      {
        signal: thunkAPI.signal,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (res.status === HttpStatusCode.Ok) {
      const idcontracthistories = res.data.data.id
      const res2 = await http.post<ResponseSuccessful<contract>>(
        '/contracts',
        {
          dateSign: body.dateSign,
          description: body.description.trim(),
          dateStartRent: body.dateStartRent,
          contractHistory: {
            id: idcontracthistories
          },
          appointmentId: body.appointmentId
        },
        {
          signal: thunkAPI.signal,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return res2.data.data
    } else {
      throw new Error('Fail to Create Contract')
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
})
