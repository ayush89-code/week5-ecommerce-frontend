import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from '../../store/wishlistSlice'
import { addToCart } from '../../store/cartSlice'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toggleComparison } from '../../store/comparisonSlice'


const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(state => state.wishlist.items)
   const comparisonItems = useSelector(state => state.comparison?.items || [])  // ✅ ADD THIS LINE

  const isInWishlist = wishlistItems.includes(product.id)
  const isInComparison = comparisonItems.includes(product.id)  // ✅ ADD THIS TOO
  const handleAddToCart = () => dispatch(addToCart(product))
  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    dispatch(toggleWishlist(product.id))
  }

    // ✅ UPDATE handleCompare (add max 4 limit)
  const handleCompare = (e) => {
    e.stopPropagation()
    if (comparisonItems.length >= 4 && !isInComparison) {
      alert('Maximum 4 products for comparison!')
      return
    }
    dispatch(toggleComparison(product.id))
  }

  const ratingStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      )
    }
    return stars
  }

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all hover:-translate-y-2 h-full">
      <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative p-4">

      
 
  <button
    onClick={handleCompare}
    className="absolute top-12 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-white z-10"
    title={isInComparison ? 'Remove from comparison' : 'Compare products'} 
     >
      <Link to={"/compare"}>
          <svg className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
          </svg>
      </Link>
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Wishlist button unchanged */}
        <button onClick={handleWishlistToggle} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-2.5 bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl shadow-lg border transition-all hover:scale-110">
          <Heart className={`w-5 h-5 transition-all duration-200 ${isInWishlist ? 'text-red-500 fill-red-500 shadow-md' : 'text-gray-400 hover:text-red-400 hover:fill-red-400'}`} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="flex gap-0.5 mr-2">{ratingStars(product.rating?.rate || 0)}</div>
          <span className="text-sm text-gray-600">({product.rating?.count || 0})</span>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 leading-tight hover:text-blue-600">{product.title}</h3>
        </Link>

        <div className="mb-6">
          <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
        </div>

        <button onClick={handleAddToCart} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
