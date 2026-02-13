import axios from 'axios'

const API_BASE = 'https://fakestoreapi.com'

export const productAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE}/products`)
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      return []
    }
  },
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/products/${id}`)
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      return null
    }
  },
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE}/products/categories`)
      return response.data
    } catch (error) {
      return []
    }
  }
}
