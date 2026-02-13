import { Heart } from 'lucide-react'
// import { useSelector } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../store/productSlice' 
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard/productCard'
import Button from '../components/common/Button'
import { Link } from 'react-router-dom'

const WishlistPage = () => {
   const dispatch = useDispatch()
  const wishlistItems = useSelector(state => state.wishlist.items)
   const { products, loading } = useSelector(state => state.products)
  
  const [wishlistProducts, setWishlistProducts] = useState([])

   useEffect(() => {
    // ✅ ENSURE PRODUCTS LOADED FIRST
    if (wishlistItems.length > 0 && !loading) {
      const filtered = products.filter(product => wishlistItems.includes(product.id))
      setWishlistProducts(filtered)
    }
  }, [wishlistItems, products, loading])  // ✅ ADD LOADING

  useEffect(() => {
    // ✅ FETCH PRODUCTS ON MOUNT IF NOT LOADED
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

 
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center"> 
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium">
            ← Back to Products
          </Link>
        </div>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wishlist ({wishlistProducts.length})</h1>
          <p className="text-xl text-gray-600">Your saved products</p>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-3xl mx-auto mb-8 flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-8">Click the heart icon on products to save them here</p>
            <Link to="/products">
              <Button size="lg" className="px-12">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}


export default WishlistPage
