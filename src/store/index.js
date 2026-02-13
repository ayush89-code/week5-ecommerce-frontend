import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import cartSlice from './cartSlice'
import wishlistSlice from './wishlistSlice'
import comparisonSlice from './comparisonSlice'

export const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    comparison: comparisonSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
