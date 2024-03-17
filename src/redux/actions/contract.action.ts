import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseSuccessful } from '../../types/response.type'
import { contract, contractHistory } from '../../types/contract.type'
import { contractValueType } from '../../schema/contract.schema'

export const getContractList = createAsyncThunk('contract/getContract', async (_, thunkAPI) => {
  const res = await http.get<ResponseSuccessful<contract[]>>('/contracts', {
    signal: thunkAPI.signal
  })
  return res.data.data
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
  const res2 = await http.post<ResponseSuccessful<contract>>('/contracts', {
    signal: thunkAPI.signal,
    dateSign: body.dateSign,
    description: body.description.trim(),
    dateStartRent: body.dateStartRent,
    contractHistory: {
      id: idcontracthistories
    },
    appointmentId: body.appointmentId
  })
  return res2.data.data
})
