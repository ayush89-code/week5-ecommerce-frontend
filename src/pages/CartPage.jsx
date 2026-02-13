import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice'  // ✅ Added clearCart
import Button from '../components/common/Button'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const dispatch = useDispatch()
  const { items, totalItems, totalAmount } = useSelector(state => state.cart)

  // ✅ Added tax & shipping calculations
  const taxRate = 0.18 // 18% GST (India)
  const shipping = 50
  const tax = totalAmount * taxRate
  const grandTotal = totalAmount + tax + shipping

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())  // ✅ New clear functionality
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Shopping Cart</h1>
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <p className="text-2xl text-gray-500 mb-8">Your cart is empty</p>
            <Link to="/products">
              <Button size="lg" className="px-12">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 block">
          ← Back to Shopping
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-12">Shopping Cart ({totalItems} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-xl p-6 mb-6 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-xl shadow-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-2xl font-bold text-blue-600 mb-4">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, Math.max(0, item.quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold px-4">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">
                    Item Total: ${item.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary - ENHANCED */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span>Subtotal ({totalItems} items):</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>GST (18%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping:</span>
                <span>$50.00</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-2xl font-bold text-gray-900">
                  <span>Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/checkout">
                <Button size="lg" className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  Proceed to Checkout →
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="secondary" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="danger"
                size="lg"
                className="w-full"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
