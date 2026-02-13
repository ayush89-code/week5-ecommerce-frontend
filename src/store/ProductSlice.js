import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../services/api'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.productAPI.getAll()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.productAPI.getCategories()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
const filterProducts = (products, filters) => {
  let filtered = [...products]

  // Category filter
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category)
  }

  // Price filter
  if (filters.priceRange) {
    filtered = filtered.filter(p => p.price <= filters.priceRange[1])
  }

  // ✅ RATING FILTER - ADD THIS
  if (filters.rating && filters.rating.length > 0) {
    filtered = filtered.filter(product =>
      filters.rating.some(rating => product.rating?.rate >= rating)
    )
  }

  return filtered
}

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    categories: [],
    loading: false,
    error: null,
    filters: {
      category: 'all',
      priceRange: [0, 5000],
      rating: [],  // ✅ CHANGE FROM [0, 5] to []
      search: ''
    },
    sort: 'featured'
  },

  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }

      // ✅ USE filterProducts function (has correct rating logic)
      state.filteredProducts = filterProducts(state.products, state.filters)

      // ✅ RE-ORDER after filtering
      productSlice.caseReducers.applySort(state)
    },

    setSort: (state, action) => {
      state.sort = action.payload
      productSlice.caseReducers.applySort(state)
    },
    applyFilters: (state) => {
      let filtered = [...state.products]

      // Category filter
      if (state.filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === state.filters.category)
      }

      // Price filter
      filtered = filtered.filter(p =>
        p.price >= state.filters.priceRange[0] &&
        p.price <= state.filters.priceRange[1]
      )

      // Rating filter (using reviews count as proxy)
      filtered = filtered.filter(p =>
        (p.rating?.rate || 0) >= state.filters.rating[0]
      )

      // Search filter
      if (state.filters.search) {
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(state.filters.search.toLowerCase())
        )
      }

      state.filteredProducts = filtered
      productSlice.caseReducers.applySort(state)
    },
    applySort: (state) => {
      const multiplier = state.sort === 'price-low-high' ? 1 : -1
      state.filteredProducts.sort((a, b) => {
        switch (state.sort) {
          case 'price-low-high':
          case 'price-high-low':
            return multiplier * (a.price - b.price)
          case 'name':
            return a.title.localeCompare(b.title)
          case 'popularity':
            return (b.rating?.count || 0) - (a.rating?.count || 0)
          default:
            return 0
        }
      })
    },
    clearFilters: (state) => {
      state.filters = {
        category: 'all',
        priceRange: [0, 5000],
        rating: [0, 5],
        search: ''
      }
      state.sort = 'featured'
      state.filteredProducts = state.products
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.filteredProducts = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(setFilters, (state, action) => {
        state.filters = { ...state.filters, ...action.payload }
        state.filteredProducts = filterProducts(state.products, state.filters)
      })
  }
})

export const {
  setFilters,
  setSort,
  applyFilters,
  clearFilters
} = productSlice.actions

export default productSlice.reducer
