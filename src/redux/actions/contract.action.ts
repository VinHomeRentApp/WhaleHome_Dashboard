import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseSuccessful } from '../../types/response.type'
import { contract, contractHistory } from '../../types/contract.type'

export const getContractList = createAsyncThunk('contract/getContract', async (_, thunkAPI) => {
  const res = await http.get<ResponseSuccessful<contract[]>>('/contracts', {
    signal: thunkAPI.signal
  })
  return res.data.data
})

export const createContract = createAsyncThunk('contract/createContract', async (body: contract, thunkAPI) => {
  console.log('body', body)

  const res = await http.post<ResponseSuccessful<contractHistory>>('/contracthistories', {
    signal: thunkAPI.signal,
    price: body.contractHistory.price,
    description: body.contractHistory.description,
    expiredTime: body.contractHistory.expiredTime,
    users: {
      id: body.contractHistory.users.id
    }
  })
  const idcontracthistories = res.data.data.id

  console.log('id', idcontracthistories)

  const res2 = await http.post<ResponseSuccessful<contract>>('/contracts', {
    signal: thunkAPI.signal,
    dateSign: body.dateSign,
    description: body.description,
    dateStartRent: body.dateStartRent,
    contractHistory: {
      id: idcontracthistories
    },
    appointmentId: body.appointmentId
  })
  return res2.data.data
})
