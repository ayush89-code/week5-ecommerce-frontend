import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import SearchAutocomplete from '../common/SearchAutocomplete'

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const cartItems = useSelector(state => state.cart?.items || [])
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            E-Shop
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/" className={`hover:text-blue-600 font-medium pb-1 border-b-2 transition-colors ${pathname === '/' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:border-blue-600'}`}>
              Home
            </Link>
            <Link to="/products" className={`hover:text-blue-600 font-medium pb-1 border-b-2 transition-colors ${pathname.includes('product') || pathname === '/products' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:border-blue-600'}`}>
              Products
            </Link>
            <Link to="/cart" className={`relative hover:text-blue-600 font-medium pb-1 border-b-2 transition-colors ${pathname === '/cart' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:border-blue-600'}`}>
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/wishlist" className={`hover:text-blue-600 font-medium pb-1 border-b-2 transition-colors ${pathname === '/wishlist' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:border-blue-600'}`}>
              Wishlist
            </Link>

          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">

            <div className="relative hidden lg:block w-80">
              <SearchAutocomplete />
            </div>

{/*         
            <div className="hidden lg:block">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-2 text-sm font-medium">
                <SearchAutocomplete />
              </button>
            </div> */}

            <Link to="/profile" className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all">
              <User className="w-5 h-5 text-white" />
            </Link>
            <Link to="/cart" className="relative p-2 hover:bg-blue-50 rounded-xl transition-all group">
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 bg-white shadow-lg">
            <nav className="flex flex-col gap-3 p-4">
              <Link
                to="/"
                className={`py-2 px-3 rounded-xl font-medium transition-colors ${pathname === '/' ? 'bg-blue-50 text-blue-600 border-2 border-blue-200' : 'hover:bg-blue-50 text-gray-700'}`}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`py-2 px-3 rounded-xl font-medium transition-colors ${pathname.includes('product') || pathname === '/products' ? 'bg-blue-50 text-blue-600 border-2 border-blue-200' : 'hover:bg-blue-50 text-gray-700'}`}
                onClick={() => setMobileOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/cart"
                className={`py-2 px-3 rounded-xl font-medium relative transition-colors ${pathname === '/cart' ? 'bg-blue-50 text-blue-600 border-2 border-blue-200' : 'hover:bg-blue-50 text-gray-700'}`}
                onClick={() => setMobileOpen(false)}
              >
                Cart
                {totalItems > 0 && <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{totalItems}</span>}
              </Link>
              <Link to="/wishlist"
                 className={`py-2 px-3 rounded-xl font-medium relative transition-colors ${pathname === '/wishlist' ? 'bg-blue-50 text-blue-600 border-2 border-blue-200' : 'hover:bg-blue-50 text-gray-700'}`}
                onClick={() => setMobileOpen(false)}
              >
                Wishlist
              </Link>

            </nav>
            <div className="flex gap-2 p-4 pt-0">
              <Link to="/profile" className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium">
                <User className="w-4 h-4" /> Profile
              </Link>
              <Link to="/cart" className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">
                <ShoppingCart className="w-4 h-4" /> Cart
              </Link>

            </div>

            <div className="p-4 border-t border-gray-200">
              <SearchAutocomplete />
            </div>

          </div>
        )}
      </div>
    </header>
  )
}

export default Header
