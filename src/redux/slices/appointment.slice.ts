/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { appointments } from '../../types/appointments.type'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { getAppointmentList } from '../actions/appointment.actions'

type initialAppointmentTypes = {
  appointmentList: appointments[]
  isLoadingAppointmentList: boolean
  error: any
}

const initialAppointmentState: initialAppointmentTypes = {
  appointmentList: [],
  isLoadingAppointmentList: false,
  error: null
}

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: initialAppointmentState,
  reducers: {
    setIsLoadingAppointList: (state, action) => {
      state.isLoadingAppointmentList = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAppointmentList.fulfilled, (state, action) => {
        state.appointmentList = action.payload
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoadingAppointmentList = true
          state.error = null
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoadingAppointmentList = false
          state.error = action.payload
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoadingAppointmentList = false
          state.error = null
        }
      )
  }
})
export const { setIsLoadingAppointList } = appointmentSlice.actions

export default appointmentSlice.reducer
