import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import passwordReducer from '../features/password/passwordSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    password: passwordReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
