import { createAsyncThunk } from '@reduxjs/toolkit'
import { Payment } from '../../types/payment.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const getAllPaymentByContract = createAsyncThunk(
  'payment/getPaymentListByContractId',
  async (id: number, thunkAPI) => {
    try {
      const response = await http.get<ResponseSuccessful<Payment[]>>(`/payment/getAllPaymentByContract/${id}`, {
        signal: thunkAPI.signal
      })
      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getAllPayments = createAsyncThunk('/payment/getAllPayment', async (_, thunkAPI) => {
  try {
    const response = await http.get<ResponseSuccessful<Payment[]>>(`/payment`, {
      signal: thunkAPI.signal
    })
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
