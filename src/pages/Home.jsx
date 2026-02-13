import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">E-Shop</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover amazing products with best prices. Shop now and enjoy fast delivery!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="text-lg">Shop Now</Button>
            </Link>
            <Link to="/products">
              <Button variant="secondary" size="lg" className="text-lg">View Categories</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Featured Categories</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {['Electronics', 'Clothing', 'Books', 'Jewelry'].map((cat) => (
            <Link key={cat} to="/products" className="group">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:shadow-2xl transform hover:-translate-y-2 transition-all group-hover:bg-blue-50">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg mb-4">
                  <span className="text-2xl font-bold text-gray-700">{cat.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{cat}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
