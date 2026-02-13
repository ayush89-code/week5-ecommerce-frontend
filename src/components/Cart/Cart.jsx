import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice'
import Button from '../common/Button'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, totalItems, totalAmount } = useSelector(state => state.cart)

  const taxRate = 0.18 // 18% GST
  const shipping = 50
  const subtotal = totalAmount
  const tax = subtotal * taxRate
  const total = subtotal + tax + shipping

  const handleRemove = (id) => dispatch(removeFromCart(id))
  const handleQuantity = (id, qty) => dispatch(updateQuantity({ id, quantity: qty }))
  const handleClear = () => dispatch(clearCart())

  if (!items.length) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl shadow-xl">
        <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🛒</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h3>
        <Button size="lg" className="px-12">Start Shopping</Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <div className="text-right">
            <div>{totalItems} items</div>
            <div className="text-sm opacity-90">Subtotal: ₹{subtotal.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-200">
        {items.map(item => (
          <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-20 h-20 object-cover rounded-xl shadow-md flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{item.title}</h4>
                <p className="text-2xl font-bold text-blue-600 mb-3">₹{item.price.toFixed(2)}</p>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button 
                    onClick={() => handleQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all font-semibold text-lg hover:scale-105"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="w-16 text-center py-2 font-bold text-xl bg-white rounded-lg shadow-sm">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => handleQuantity(item.id, item.quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all font-semibold text-lg hover:scale-105"
                  >
                    +
                  </button>
                </div>
                
                {/* Item Total */}
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    ₹{item.totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Remove Button */}
            <div className="flex justify-end mt-4 pt-4 border-t">
              <button
                onClick={() => handleRemove(item.id)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl font-medium transition-all group"
              >
                <svg className="w-4 h-4 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-lg">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>GST (18%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Shipping:</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between text-2xl font-bold text-gray-900">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="secondary" size="lg" className="flex-1" onClick={handleClear}>
            Clear Cart
          </Button>
          <Button size="lg" className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
            Proceed to Checkout →
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart
