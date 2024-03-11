import { createAsyncThunk } from '@reduxjs/toolkit'
import { apartment } from '../../types/appartment.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const getApartmentList = createAsyncThunk('apartment/getApartmentList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<apartment[]>>('/apartments', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

export const updateApartment = createAsyncThunk(
  'apartment/updateApartment',
  async ({ id, body }: { id: number; body: apartment }, thunkAPI) => {
    const res = await http.put<ResponseSuccessful<apartment>>(`/apartments/udpate/${id}`, body, {
      signal: thunkAPI.signal
    })
    return res.data.data
  }
)

export const deleteApartment = createAsyncThunk('apartment/deleteApartment', async (id: number, thunkAPI) => {
  const res = await http.put<ResponseSuccessful<apartment>>(`/apartments/delete/${id}`, {
    signal: thunkAPI.signal
  })
  return res.data.data
})

export const createApartment = createAsyncThunk('apartment/createApartment', async (body: apartment, thunkAPI) => {
  const res = await http.post<ResponseSuccessful<apartment>>(`/apartments`, body, {
    signal: thunkAPI.signal
  })
  return res.data.data
})
