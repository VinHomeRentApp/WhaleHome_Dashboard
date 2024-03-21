import { createAsyncThunk } from '@reduxjs/toolkit'
import { building } from '../../types/building.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'
import { BuildingTypeValue } from '../../schema/building.schema'

export const getBuildingList = createAsyncThunk('building/getBuildingList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<building[]>>('/buildings', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

export const updateBuilding = createAsyncThunk(
  'building/updateBuilding',
  async ({ id, body }: { id: number; body: BuildingTypeValue }, thunkAPI) => {
    try {
      const res = await http.put<ResponseSuccessful<building>>(`/buildings/update/${id}`, {
        signal: thunkAPI.signal,
        name: body.name,
        zone: {
          id: body.zoneId,
          area: {
            id: body.areaId
          }
        }
      })
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createBuilding = createAsyncThunk('building/createBuilding', async (body: BuildingTypeValue, thunkAPI) => {
  try {
    const res = await http.post<ResponseSuccessful<building>>(`/buildings`, {
      signal: thunkAPI.signal,
      name: body.name,
      zone: {
        id: body.zoneId,
        area: {
          id: body.areaId
        }
      }
    })
    return res.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteBuilding = createAsyncThunk('building/deleteBuilding', async ({ id }: { id: number }, thunkAPI) => {
  const res = await http.put<ResponseSuccessful<building>>(`/buildings/delete/${id}`, {
    signal: thunkAPI.signal
  })
  return res.data.data
})
