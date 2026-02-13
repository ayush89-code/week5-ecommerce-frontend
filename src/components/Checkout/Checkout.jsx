import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../common/Button'

const Checkout = () => {
  const { totalAmount } = useSelector(state => state.cart)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    payment: 'card'
  })

  const tax = totalAmount * 0.18
  const shipping = 50
  const total = totalAmount + tax + shipping

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email
      case 2:
        return formData.address && formData.phone
      default:
        return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate order processing
    alert('Order placed successfully! 🎉')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          Checkout
        </h1>
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Step {step} of 3
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">Subtotal: ${totalAmount.toFixed(2)}</div>
                <div className="flex justify-between">GST (18%): ${tax.toFixed(2)}</div>
                <div className="flex justify-between">Shipping: $50.00</div>
                <div className="flex justify-between font-bold text-xl pt-2 border-t">
                  Total: ${total.toFixed(2)}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
              <select
                name="payment"
                value={formData.payment}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              variant="secondary"
              type="button"
              onClick={prevStep}
              className="flex-1"
            >
              Previous
            </Button>
          )}
          <Button
            type="button"
            onClick={step < 3 ? nextStep : undefined}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            disabled={!validateStep()}
          >
            {step < 3 ? 'Next' : 'Place Order'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Checkout
