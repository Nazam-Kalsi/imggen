import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface UserT {
  user: {
    id:string,
    [key:string]:string} | null,
  loading:boolean
}

// Define the initial state using that type
const initialState: UserT = {
  user:null,
  loading:true
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   logedIn: (state, action: PayloadAction<UserT['user']>)=>{
        state.user = action.payload
        state.loading = false
   },
   logedOut: (state)=>{
    state.user = null
    state.loading = true
   }
  }
})

export const { logedIn, logedOut } = userSlice.actions
export default userSlice.reducer