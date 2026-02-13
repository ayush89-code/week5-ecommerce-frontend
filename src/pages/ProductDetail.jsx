import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react' 
import { Heart, ShoppingCart, Star, ChevronLeft } from 'lucide-react'
import { addToCart } from '../store/cartSlice'
import { toggleWishlist } from '../store/wishlistSlice'
import Button from '../components/common/Button'
import StarRating from '../components/Reviews/StarRating'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)
  const wishlistItems = useSelector(state => state.wishlist.items)

  const product = products.find(p => p.id == id)
  // Reviews state
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const handleSubmitReview = () => {
    if (reviewRating && reviewText.trim()) {
      console.log('⭐ New review:', { rating: reviewRating, text: reviewText })
      alert('Review submitted! (Demo - saves to console)')
      setReviewRating(0)
      setReviewText('')
    }
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    dispatch(toggleWishlist(product.id))
  }

  const ratingStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${i <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      )
    }
    return stars
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md text-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ChevronLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <Link to="/products" className="inline-flex items-center gap-2 mb-12 text-blue-600 hover:text-blue-700 font-medium">
          <ChevronLeft className="w-5 h-5" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="space-y-6">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-2xl"
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex gap-0.5">{ratingStars(product.rating?.rate || 0)}</div>
                    <span className="text-lg text-gray-600">({product.rating?.count || 0})</span>
                  </div>
                  <div className="text-5xl font-bold text-blue-600">${product.price.toFixed(2)}</div>
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full mt-2">In Stock</span>
                </div>
                <button onClick={handleWishlistToggle} className="p-3 bg-white/80 backdrop-blur rounded-2xl shadow-lg hover:shadow-xl hover:scale-110 transition-all">
                  <Heart className={`w-7 h-7 ${wishlistItems.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-400'}`} />
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl font-semibold">{product.category}</span>
              </div>


              {/* ========= REVIEWS SECTION (Step 5) ========= */}
              <div className="mt-16 pt-8 border-t border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  Reviews & Ratings
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                    {product.rating?.count || 0} reviews
                  </span>
                </h2>

                {/* Average Rating Display */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-3xl mb-10 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <StarRating rating={product.rating?.rate || 0} readonly size="lg" />
                      <span className="text-4xl font-bold text-gray-900">
                        {product.rating?.rate?.toFixed(1) || 0}
                      </span>
                    </div>
                    <div className="text-lg text-gray-600">
                      Based on {product.rating?.count || 0} reviews
                    </div>
                  </div>
                </div>

                {/* Add Review Form */}
                <div className="bg-white p-8 rounded-3xl shadow-2xl mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Your Review</h3>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <StarRating
                        rating={0}
                        onChange={(rating) => setReviewRating(rating)}
                        size="lg"
                      />
                      <span className="text-xl font-semibold text-gray-900">Rate this product</span>
                    </div>

                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience with other shoppers. What did you like or dislike? Write a helpful review..."
                      className="w-full p-6 border border-gray-200 rounded-2xl resize-vertical min-h-[120px] focus:ring-3 focus:ring-blue-200 focus:border-blue-500 text-lg"
                      rows="4"
                    />

                    <button
                      onClick={handleSubmitReview}
                      disabled={!reviewRating || !reviewText.trim()}
                      className="w-full lg:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-8 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>

                {/* Sample Reviews List */}
                <div className="space-y-6">
                  {[1, 2, 3].map((review, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                          <span className="text-xl font-bold text-white">JD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <StarRating rating={4 + Math.random()} readonly size="sm" />
                            <span className="font-semibold text-gray-900 text-lg">John Doe</span>
                            <span className="text-sm text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            "Absolutely love this product! Great quality and fast delivery.
                            Would definitely recommend to anyone looking for premium quality."
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-6 border-t space-y-4">
              <Button onClick={handleAddToCart} size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-lg py-4">
                <ShoppingCart className="w-6 h-6 mr-2" /> Add to Cart
              </Button>
              <Button variant="secondary" size="lg" className="w-full text-lg py-4">Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
