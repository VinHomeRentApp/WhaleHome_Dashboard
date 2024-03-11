import { createAsyncThunk } from '@reduxjs/toolkit'
import { apartmentClass } from '../../types/appartment.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const getApartmentClassList = createAsyncThunk('apartmentClass/getApartmentClassList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<apartmentClass[]>>('/apartmentclasses', {
    signal: thunkAPI.signal
  })
  return response.data.data
})
