import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface UserT {
  user: {[key:string]:string} | null,
  isLogedIn:boolean
}

// Define the initial state using that type
const initialState: UserT = {
  user:null,
  isLogedIn:false
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   logedIn: (state, action: PayloadAction<UserT['user']>)=>{
        state.user = action.payload
        state.isLogedIn = true
   },
   logedOut: (state)=>{
    state.user = null
    state.isLogedIn = false
   }
  }
})

export const { logedIn, logedOut } = userSlice.actions
export default userSlice.reducer