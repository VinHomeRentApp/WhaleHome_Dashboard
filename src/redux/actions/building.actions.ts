import { createAsyncThunk } from '@reduxjs/toolkit'
import { building } from '../../types/building.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'

export const getBuildingList = createAsyncThunk('building/getBuildingList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<building[]>>('/buildings', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

export const updateBuilding = createAsyncThunk(
  'building/updateBuilding',
  async ({ id, body }: { id: number; body: building }, thunkAPI) => {
    const res = await http.put<ResponseSuccessful<building>>(`/buildings/update/${id}`, body, {
      signal: thunkAPI.signal
    })
    return res.data.data
  }
)

export const createBuilding = createAsyncThunk('building/createBuilding', async (body: building, thunkAPI) => {
  const res = await http.post<ResponseSuccessful<building>>(`/buildings`, {
    signal: thunkAPI.signal,
    name: body.name,
    zone: {
      id: body.zone.id,
      createDate: '2024-03-07',
      status: true,
      name: 'string',
      area: {
        id: body.zone.area.id,
        createDate: '2024-03-07',
        status: true,
        name: 'string'
      }
    }
  })
  return res.data.data
})

export const deleteBuilding = createAsyncThunk('building/deleteBuilding', async ({ id }: { id: number }, thunkAPI) => {
  const res = await http.put<ResponseSuccessful<building>>(`/buildings/delete/${id}`, {
    signal: thunkAPI.signal
  })
  return res.data.data
})
