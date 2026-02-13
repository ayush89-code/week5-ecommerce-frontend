import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const Checkout = () => {
  const { items, totalAmount, totalItems } = useSelector(state => state.cart)
  const tax = totalAmount * 0.18
  const shipping = 50
  const total = totalAmount + tax + shipping

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/cart" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          ← Back to Cart
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between py-2 border-b">
              <span>Subtotal ({totalItems} items):</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>GST (18%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Shipping:</span>
              <span>$50.00</span>
            </div>
            <div className="flex justify-between pt-4 text-2xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-green-700"
              onClick={() => {
                alert(`🎉 Order #${Math.floor(Math.random() * 10000)} placed successfully!\nTotal: $${total.toFixed(2)}`)
                // Clear cart after successful order
                window.location.href = '/'
              }}
            >
              Complete Order →
            </Button>

            <Link to="/products">
              <Button variant="secondary" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
