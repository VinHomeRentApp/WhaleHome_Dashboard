import { createAsyncThunk } from '@reduxjs/toolkit'
import { area } from '../../types/area.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const getArea = createAsyncThunk('area/getAreaList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<area[]>>('/areas', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

export const createArea = createAsyncThunk('area/createArea', async (name: string, thunkAPI) => {
  const response = await http.post<ResponseSuccessful<area>>('/areas', {
    signal: thunkAPI.signal,
    name: name.trim()
  })
  return response.data.data
})

export const updateArea = createAsyncThunk(
  'area/updateArea',
  async ({ areaId, body }: { areaId: number; body: Omit<area, 'id' | 'createDate'> }, thunkAPI) => {
    const response = await http.put<ResponseSuccessful<area>>(`areas/update/${areaId}`, body, {
      signal: thunkAPI.signal
    })
    return response.data.data
  }
)

export const deleteArea = createAsyncThunk('area/deleteArea', async (areaid: number, thunkAPI) => {
  const response = await http.put<area>(`areas/delete/${areaid}`, {
    signal: thunkAPI.signal
  })
  return response.data
})
