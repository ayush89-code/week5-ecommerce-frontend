import { createSlice } from '@reduxjs/toolkit'

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const parsed = JSON.parse(cart)
      return {
        items: parsed.items || [],
        totalItems: parsed.items.reduce((sum, i) => sum + i.quantity, 0),
        totalAmount: parsed.items.reduce((sum, i) => sum + (i.totalPrice || i.price), 0)
      }
    }
  } catch {
    console.log('Failed to load cart from localStorage')
  }
  return { items: [], totalItems: 0, totalAmount: 0 }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      // Validation
      if (!item.id || !item.title || item.price <= 0) return
      
      const existingItem = state.items.find(i => i.id === item.id)
      
      if (existingItem) {
        existingItem.quantity += 1
        existingItem.totalPrice = existingItem.price * existingItem.quantity
      } else {
        state.items.push({
          ...item,
          quantity: 1,
          totalPrice: item.price
        })
      }
      
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
      state.totalAmount = state.items.reduce((sum, i) => sum + i.totalPrice, 0)
      localStorage.setItem('cart', JSON.stringify({ items: state.items }))
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload
      const itemIndex = state.items.findIndex(i => i.id === itemId)
      if (itemIndex !== -1) {
        const item = state.items[itemIndex]
        state.totalItems -= item.quantity
        state.totalAmount -= item.totalPrice
        state.items.splice(itemIndex, 1)
        localStorage.setItem('cart', JSON.stringify({ items: state.items }))
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)
      if (item && quantity >= 0) {
        const oldQuantity = item.quantity
        item.quantity = quantity
        item.totalPrice = item.price * quantity
        state.totalItems += (quantity - oldQuantity)
        state.totalAmount = state.items.reduce((sum, i) => sum + i.totalPrice, 0)
        localStorage.setItem('cart', JSON.stringify({ items: state.items }))
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalAmount = 0
      localStorage.removeItem('cart')
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
