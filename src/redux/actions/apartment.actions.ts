import { createAsyncThunk } from '@reduxjs/toolkit'
import { apartment } from '../../types/appartment.type'
import { ResponseSuccessful } from '../../types/response.type'
import { http } from '../../utils/http'
import { updateApartmentValuesType } from '../../schema/apartment.schema'

export const getApartmentList = createAsyncThunk('apartment/getApartmentList', async (_, thunkAPI) => {
  const response = await http.get<ResponseSuccessful<apartment[]>>('/apartments', {
    signal: thunkAPI.signal
  })
  return response.data.data
})

export const updateApartment = createAsyncThunk(
  'apartment/updateApartment',
  async ({ id, body }: { id: number; body: updateApartmentValuesType }, thunkAPI) => {
    try {
      const res = await http.put<ResponseSuccessful<apartment>>(`/apartments/update/${id}`, {
        signal: thunkAPI.signal,
        name: body.name,
        description: body.description,
        apartmentClass: {
          id: body.apartmentClassId
        },
        building: {
          id: body.buildingID,
          zone: {
            id: body.zoneID,
            area: {
              id: body.areaID
            }
          }
        }
      })
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteApartment = createAsyncThunk('apartment/deleteApartment', async (id: number, thunkAPI) => {
  const res = await http.put<ResponseSuccessful<apartment>>(`/apartments/delete/${id}`, {
    signal: thunkAPI.signal
  })
  return res.data.data
})

export const createApartment = createAsyncThunk(
  'apartment/createApartment',
  async (body: updateApartmentValuesType, thunkAPI) => {
    try {
      const res = await http.post<ResponseSuccessful<apartment>>(`/apartments`, {
        signal: thunkAPI.signal,
        name: body.name,
        description: body.description,
        apartmentClass: {
          id: body.apartmentClassId
        },
        building: {
          id: body.buildingID,
          zone: {
            id: body.zoneID,
            area: {
              id: body.areaID
            }
          }
        }
      })
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
