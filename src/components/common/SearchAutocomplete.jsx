import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const SearchAutocomplete = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const { products } = useSelector(state => state.products)
  const searchRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6)
      setFilteredProducts(filtered)
      setShowResults(true)
    } else {
      setFilteredProducts([])
      setShowResults(false)
    }
  }, [searchTerm, products])

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {showResults && filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          {filteredProducts.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group"
              onClick={() => setShowResults(false)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-xl shadow-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600">
                  {product.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-1">{product.category}</p>
                <p className="text-lg font-bold text-blue-600 mt-1">${product.price.toFixed(1)}</p>
              </div>
            </Link>
          ))}
          <div className="px-4 py-3 border-t border-gray-100">
            <Link
              to={`/products?search=${encodeURIComponent(searchTerm)}`}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm block text-center"
              onClick={() => setShowResults(false)}
            >
              View all results ({filteredProducts.length}+)
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchAutocomplete
