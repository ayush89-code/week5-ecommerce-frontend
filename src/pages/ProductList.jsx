import { useEffect, useMemo } from 'react'  // ✅ ADD useMemo
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, fetchCategories, setFilters, setSort, clearFilters } from '../store/productSlice'
import ProductCard from '../components/ProductCard/productCard'
import Button from '../components/common/Button'

const ProductList = () => {
  const dispatch = useDispatch()
  const {
    filteredProducts,
    categories,
    loading,
    filters,  // ✅ Debug: Log filters
    sort,
    products
  } = useSelector(state => state.products)

  // ✅ DEBUG: Log filters state
  console.log('🔍 Filters:', filters)
  console.log('⭐ Filtered products:', filteredProducts.length)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  const handleFilterChange = (key, value) => {
    console.log(`📝 Setting ${key}:`, value)  // ✅ Debug
    dispatch(setFilters({ [key]: value }))
  }

  const handleRatingFilter = (rating) => {
    const currentRatings = filters.rating || []
    const newRatings = currentRatings.includes(rating)
      ? currentRatings.filter(r => r !== rating)
      : [...currentRatings, rating]
    
    console.log('⭐ Rating filter:', newRatings)  // ✅ Debug
    dispatch(setFilters({ rating: newRatings }))
  }

  const handleSortChange = (value) => {
    dispatch(setSort(value))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  // ✅ FORCE RERENDER ON FILTER CHANGE
  const visibleProducts = useMemo(() => filteredProducts, [filteredProducts])

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          Products ({products.length})
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products with filtering and sorting options
          </p>
        </div>

        {/* Filters & Sorting */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6 bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Filters</h3>

            {/* Category Filter */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">Category</label>
              <select
                value={filters.category || 'all'}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="mt-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">Rating</label>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center gap-2 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={(filters.rating || []).includes(rating)}  // ✅ Fix stale state
                      onChange={() => handleRatingFilter(rating)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <span className="text-yellow-400">{'★'.repeat(rating)}</span>
                      <span className="text-gray-400">{'★'.repeat(5-rating)}</span> {rating}+ Stars
                    </span>
                  </label>
                ))}
              </div>
              {/* ✅ Debug info */}
              {filters.rating && (
                <div className="mt-3 p-2 bg-blue-50 rounded-lg text-xs text-blue-800">
                  Active: {filters.rating.join(', ')}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">Price Range</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0" max="500" step="10"
                  value={filters.priceRange?.[1] || 500}
                  onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-sm text-gray-600">
                  Max: ${filters.priceRange?.[1] || 500}
                </span>
              </div>
            </div>

            <Button variant="secondary" className="w-full" onClick={handleClearFilters}>
              Clear All Filters
            </Button>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sorting */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex-1">
                <label className="text-lg font-semibold text-gray-900 mr-3">Sort by:</label>
                <select
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>

            <div className="mb-8 text-sm text-gray-600">
              Showing {visibleProducts.length} of {products.length} products
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {visibleProducts.length === 0 && (
              <div className="col-span-full text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                <Button onClick={handleClearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
