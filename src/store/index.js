import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import userSlice from './userSlice'
import wishlistSlice from './wishlistSlice'
import comparisonSlice from './comparisonSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
    user: userSlice,
    wishlist: wishlistSlice,
    comparison: comparisonSlice
  },
})
