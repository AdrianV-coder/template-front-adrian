import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import postsReducer from './postsSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
