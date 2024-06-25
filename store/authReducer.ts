import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

//data types
export interface AuthState {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  profilePicture: any,
  isLoggedIn: boolean

}
//initial state
const initialState: AuthState = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: '11111111',
  profilePicture: require('../assets/profileImg.png'), 
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
      updateProfilePicture: (state, action: PayloadAction<any>) => {
        state.profilePicture = { uri: action.payload }; // Update profile picture
      },
      updateUserDetails: (state, action) => {
        const{newFirstName, newLastName, newEmail} = action.payload;
        state.firstName = action.payload.newFirstName;
        state.lastName = action.payload.newLastName;
        state.email = action.payload.newEmail;
      },
  
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { signUp, login, logout, updateProfilePicture, updateUserDetails } = authSlice.actions
  
  export default authSlice.reducer
  