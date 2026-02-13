import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearComparison } from '../store/comparisonSlice'
import Button from '../components/common/Button'
import { ChevronLeft } from 'lucide-react'

const ComparisonPage = () => {
  const dispatch = useDispatch()
  const { items: comparisonItems } = useSelector(state => state.comparison)
  const { products } = useSelector(state => state.products)
  
  const comparedProducts = products.filter(p => comparisonItems.includes(p.id))

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium">
            <ChevronLeft className="w-5 h-5 inline mr-1" /> Back to Products
          </Link>
          {comparedProducts.length > 0 && (
            <Button 
              variant="secondary" 
              onClick={() => dispatch(clearComparison())}
              className="ml-auto"
            >
              Clear Comparison
            </Button>
          )}
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Comparison ({comparedProducts.length}/4)
          </h1>
          <p className="text-xl text-gray-600">Compare up to 4 products side by side</p>
        </div>

        {comparedProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-3xl mx-auto mb-8 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No products selected</h3>
            <p className="text-gray-600 mb-8">Click the compare icon (⏫) on products to add them here</p>
            <Link to="/products">
              <Button size="lg" className="px-12">Start Comparing</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  {comparedProducts.map(product => (
                    <th key={product.id} className="p-6 text-left">
                      <img src={product.image} alt={product.title} className="w-20 h-20 object-contain mx-auto mb-2 rounded-xl" />
                      <h3 className="font-bold text-sm line-clamp-2">{product.title}</h3>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-6 font-semibold text-gray-900 border-t">Price</td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="p-6 text-center border-t">
                      <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-gray-900 border-t">Rating</td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="p-6 text-center border-t">
                      <div className="flex justify-center gap-0.5 mb-1">
                        {Array.from({length: 5}, (_, i) => (
                          <span key={i} className={`text-sm ${i < Math.floor(product.rating?.rate || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{product.rating?.rate?.toFixed(1) || 0}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-gray-900 border-t">Category</td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="p-6 text-center border-t text-sm">{product.category}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ComparisonPage
