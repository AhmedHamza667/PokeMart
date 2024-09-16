import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

//data types
export interface AuthState {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  profilePicture: any,
  isLoggedIn: boolean,
  loginError: boolean,  
}
//initial state
const initialState: AuthState = {
  firstName: 'Loading',
  lastName: 'User...',
  email: 'test@test.com',
  password: '11111111',
  profilePicture: require('../assets/account.png'), 
  isLoggedIn: false,
  loginError: false,
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
          state.loginError = false;  // Clear any error on success
        } else {
          state.loginError = true;   // Set error flag if login fails
          state.isLoggedIn = false;
        }
      },  
      logout: (state) => {
        state.isLoggedIn = false;
      },
      updateProfilePicture: (state, action: PayloadAction<any>) => {
        state.profilePicture = { uri: action.payload }; // Update profile picture
      },
      updateUserDetails: (state, action) => {
        if(action.payload.newFirstName){
          state.firstName = action.payload.newFirstName;
        }
        if(action.payload.newLastName){
          state.lastName = action.payload.newLastName;
        }
        if(action.payload.newEmail){
          state.email = action.payload.newEmail;
        }
        else{
          return { ...state, ...action.payload };
        }
      },
  
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { signUp, login, logout, updateProfilePicture, updateUserDetails } = authSlice.actions
  
  export default authSlice.reducer
  