import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types/user.type'

export type AuthUser = Omit<User, 'password'>

interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
}

const storedUser = localStorage.getItem('authUser')

const initialState: AuthState = {
  isAuthenticated: !!storedUser,
  user: storedUser ? JSON.parse(storedUser) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUser>) => {
      state.isAuthenticated = true
      state.user = action.payload
      localStorage.setItem('authUser', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('authUser')
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
