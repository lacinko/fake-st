import {
  createListenerMiddleware,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit'
import type { MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User } from '../../types/types'

type AuthState = {
  user: User | null
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user
      state.token = token
    },
    logout: () => {
      localStorage.removeItem('userInfo')
      return { user: null, token: null }
    },
  },
})

export const { setCredentials, logout } = slice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user

// Create the middleware instance and methods
export const userListenerMiddleware = createListenerMiddleware()

userListenerMiddleware.startListening({
  matcher: isAnyOf(setCredentials),
  effect: (_, listernerApi: MiddlewareAPI) => {
    localStorage.setItem(
      'userInfo',
      JSON.stringify(listernerApi.getState().auth)
    )
  },
})

export default slice.reducer
