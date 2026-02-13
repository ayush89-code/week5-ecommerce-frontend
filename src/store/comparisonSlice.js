import { createSlice } from '@reduxjs/toolkit'

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState: {
    items: [],
    isComparing: false
  },
  reducers: {
    toggleComparison: (state, action) => {
      const id = action.payload
      const index = state.items.findIndex(item => item === id)
      if (index > -1) {
        state.items.splice(index, 1)
      } else {
        if (state.items.length < 4) {  // Max 4 products
          state.items.push(id)
        }
      }
    },
    clearComparison: (state) => {
      state.items = []
    }
  }
})

export const { toggleComparison, clearComparison } = comparisonSlice.actions
export default comparisonSlice.reducer
