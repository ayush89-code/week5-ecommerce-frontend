import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import Header from './components/Header/Header.jsx'

// ✅ LAZY LOADED PAGES (Step 6 - Code Splitting)
const Home = lazy(() => import('./pages/Home'))
const ProductList = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const CartPage = lazy(() => import('./pages/CartPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const Checkout = lazy(() => import('./pages/Checkout'))
const ComparisonPage = lazy(() => import('./pages/ComparisonPage.jsx'))

// ✅ Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6 shadow-lg"></div>
      <p className="text-xl font-semibold text-gray-700 tracking-wide">Loading...</p>
    </div>
  </div>
)

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compare" element={<ComparisonPage />} />

        </Routes>
      </Suspense>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  )
}

export default App
