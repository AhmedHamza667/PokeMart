import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

//data types
export interface AuthState {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isLoggedIn: boolean

}
//initial state
const initialState: AuthState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isLoggedIn: false

}
//reducers
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      signUp: (state, action: PayloadAction<{firstName: string, lastName: string, email: string, password: string}>) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.password = action.payload.password;
      },
      login: (state, action: PayloadAction<{email: string, password: string}>) => {
        if (state.email === action.payload.email && state.password === action.payload.password) {
          state.isLoggedIn = true;
        }
      },
      logout: (state) => {
        state.isLoggedIn = false;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { signUp, login, logout } = authSlice.actions
  
  export default authSlice.reducer
  