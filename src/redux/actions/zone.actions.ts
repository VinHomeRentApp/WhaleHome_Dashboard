import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResponseSuccessful } from '../../types/response.type'
import { zone } from '../../types/zone.type'
import { http } from '../../utils/http'
import { countBuildingTypes } from '../types/zone.types'
import { ZoneTypeValue } from '../../schema/zone.schema'

export const getZoneList = createAsyncThunk('zone/getZoneList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<zone[]>>('/zone', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

export const createZone = createAsyncThunk('zone/createZone', async (body: ZoneTypeValue, thunkAPI) => {
  try {
    const response = await http.post<ResponseSuccessful<zone>>('/zone', {
      signal: thunkAPI.signal,
      name: body.name,
      area: {
        id: body.areaId
      },
      status: true
    })
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateZone = createAsyncThunk(
  'zone/updateZone',
  async ({ id, body }: { id: number; body: ZoneTypeValue }, thunkAPI) => {
    try {
      const response = await http.put<ResponseSuccessful<zone>>(`zone/update/${id}`, {
        signal: thunkAPI.signal,
        name: body.name,
        area: {
          id: body.areaId
        },
        status: true
      })
      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteZone = createAsyncThunk('zone/deleteZone', async (id: number, thunkAPI) => {
  const response = await http.put<ResponseSuccessful<zone>>(`zone/delete/${id}`, {
    signal: thunkAPI.signal
  })
  return response.data.data
})

export const countBuildingByZone = createAsyncThunk('zone/countBuilding', async (_, thunkAPI) => {
  try {
    const response = await http.get<ResponseSuccessful<countBuildingTypes[]>>('zone/count-building')
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
