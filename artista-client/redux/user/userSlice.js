import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser : JSON.parse(localStorage.getItem("currentUserInLocalStorageForArtista")) || null ,
  loading : false ,
  error : null ,
}

const userSlice = createSlice({
  name : "user" ,
  initialState ,
  reducers : {
    signInStart : (state) => {
      state.loading = true ;
      state.error = null ;
    },
    signInSuccess : (state,action) => {
      state.loading = false ;
      state.error = null ;
      state.currentUser = action.payload ;
      localStorage.setItem("currentUserInLocalStorageForArtista",JSON.stringify(action.payload))
    },
    signInFailure : (state,action) =>{
      state.loading = false ;
      state.error =action.payload;
    },
    signoutSuccess : (state) => {
      state.currentUser = null ;
      state.error = null ;
      state.loading = false ;
    }
  }
})

export const { signInStart , signInSuccess , signInFailure , signoutSuccess } = userSlice.actions ;

export default userSlice.reducer ;