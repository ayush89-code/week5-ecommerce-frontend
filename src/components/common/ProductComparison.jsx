import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from './Button'
import { X } from 'lucide-react'

const ProductComparison = ({ isOpen, onClose }) => {
  const [comparedProducts, setComparedProducts] = useState([])
  const products = useSelector(state => state.products.products)

  const addToCompare = (product) => {
    if (!comparedProducts.find(p => p.id === product.id) && comparedProducts.length < 4) {
      setComparedProducts([...comparedProducts, product])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">Product Comparison</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                ⚖️
              </div>
              <h3 className="text-2xl font-bold mb-2">No products selected</h3>
              <p className="text-gray-600 mb-8">Click "Compare" on product cards to add items</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    {['Feature', ...comparedProducts.map(p => p.title.slice(0, 20) + '...'), ''].map((header, idx) => (
                      <th key={idx} className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {['Price', 'Rating', 'Category'].map((feature) => (
                    <tr key={feature} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{feature}</td>
                      {comparedProducts.map(product => (
                        <td key={product.id} className="px-6 py-4">
                          {feature === 'Price' && `$${product.price}`}
                          {feature === 'Rating' && `${product.rating?.rate || 0}/5`}
                          {feature === 'Category' && product.category}
                        </td>
                      ))}
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductComparison
