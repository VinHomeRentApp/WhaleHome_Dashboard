import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import { useDispatch } from 'react-redux'
import ZoneReducer from './zone.slice'
import buildingSlice from './building.slice'
import areaSlice from './area.slice'
import postSlice from './post.slice'
export const store = configureStore({
  reducer: {
    auth: authSlice,
    zone: ZoneReducer,
    building: buildingSlice,
    area: areaSlice,
    post: postSlice
  }
})

// Lấy RootState và AppDispatch từ store của chúng ta
// Lấy RootState và AppDispatch từ store của chúng ta.
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
