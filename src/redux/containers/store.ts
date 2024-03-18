import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import apartmentSlice from '../slices/apartment.slice'
import apartmentClassSlice from '../slices/apartmentClass.slice'
import appointmentSlice from '../slices/appointment.slice'
import areaSlice from '../slices/area.slice'
import authSlice from '../slices/auth.slice'
import buildingSlice from '../slices/building.slice'
import contractSlice from '../slices/contract.slice'
import issueSlice from '../slices/issue.slice'
import paymentSlice from '../slices/payment.slice'
import postSlice from '../slices/post.slice'
import problemSlice from '../slices/problem.slice'
import reviewSlice from '../slices/review.slice'
import userSlice from '../slices/user.slice'
import zoneSlice from '../slices/zone.slice'
export const store = configureStore({
  reducer: {
    auth: authSlice,
    zone: zoneSlice,
    building: buildingSlice,
    area: areaSlice,
    post: postSlice,
    review: reviewSlice,
    issue: issueSlice,
    problem: problemSlice,
    apartment: apartmentSlice,
    apartmentClass: apartmentClassSlice,
    contract: contractSlice,
    user: userSlice,
    appointment: appointmentSlice,
    payment: paymentSlice
  }
})

// Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
