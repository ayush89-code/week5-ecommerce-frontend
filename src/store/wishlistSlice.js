import { createSlice } from '@reduxjs/toolkit'

const loadWishlistFromStorage = () => {
  try {
    const wishlist = localStorage.getItem('wishlist')
    return wishlist ? JSON.parse(wishlist) : []
  } catch {
    return []
  }
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromStorage()
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const productId = action.payload
      const index = state.items.findIndex(item => item === productId)
      
      if (index > -1) {
        // Remove from wishlist (hollow heart)
        state.items.splice(index, 1)
      } else {
        // Add to wishlist (filled heart)
        state.items.push(productId)
      }
      
      localStorage.setItem('wishlist', JSON.stringify(state.items))
    }
  }
})

export const { toggleWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
