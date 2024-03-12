import { createAsyncThunk } from '@reduxjs/toolkit'
import { appointments } from '../../types/appointments.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const getAppointmentList = createAsyncThunk('appointment/getAppointmentList', async (_, thunkAPI) => {
  try {
    const response = await http.get<ResponseSuccessful<appointments[]>>('/appointments', {
      signal: thunkAPI.signal
    })
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
