// src/store/userSlice.js  
import { createSlice } from '@reduxjs/toolkit'
export default createSlice({
  name: 'user',
  initialState: { user: null, isAuthenticated: false },
  reducers: {}
}).reducer
