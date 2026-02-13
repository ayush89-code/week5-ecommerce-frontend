# 🛒 React E-Commerce Store

A production-ready e-commerce application built with **React 18**, **Redux Toolkit**, **Tailwind CSS**, and **Vite**.  
This project demonstrates advanced frontend development concepts including state management, performance optimization, and responsive UI design.

---

## ✨ Features

| Feature | Description |
|------|------------|
| 🔍 Advanced Filters | Category, Price Range, Star Rating (4⭐+) |
| 🛒 Smart Cart | Quantity controls, remove items, localStorage persistence |
| ❤️ Wishlist | Toggle wishlist items, persists after refresh |
| 🧾 Product Comparison | Compare up to 4 products side-by-side |
| ⭐ Reviews | Interactive star ratings with review form |
| ⚡ Performance | Lazy loading, code splitting, optimized bundle |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite 5, Tailwind CSS, Headless UI  
- **State Management:** Redux Toolkit (5 slices)  
- **Routing:** React Router v6  
- **Icons:** Lucide React  
- **Storage:** localStorage (Cart & Wishlist persistence)  
- **Build Tool:** Vite (Production optimized)

---

## 🚀 Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-react-app.git
cd ecommerce-react-app
npm install
npm run dev
```
📱 Application Flow

/products → Filter by Category / Price / ⭐ Rating

🧾 Compare → Add up to 4 products → /compare

❤️ Wishlist → Toggle hearts → /wishlist

🛒 Cart → Add items → /cart (quantity controls)

/product/:id → Interactive ⭐ reviews + ratings

🏗️ Project Structure
src/
├── components/
│   ├── ProductCard/
│   ├── common/
│   └── layout/
├── pages/
│   ├── ProductList.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Wishlist.jsx
│   └── Compare.jsx
├── store/
│   ├── productSlice.js
│   ├── cartSlice.js
│   ├── wishlistSlice.js
│   ├── comparisonSlice.js
│   └── userSlice.js


🎯 Key Implementations
Advanced Filtering
Redux Toolkit Slices

products → filtering & sorting

cart → quantity & persistence

wishlist → toggle & refresh persistence

comparison → max 4 products

user → authentication simulation

⚡ Performance Optimizations

Lazy loading images (loading="lazy")

Code splitting with Vite

Memoization using useMemo

Optimized re-renders with React.memo

Lightweight production bundle

📊 Component Overview
Component	Responsibility
ProductCard	Wishlist, Compare, Add to Cart
StarRating	Interactive ratings
FilterSidebar	Category, Price, Rating filters
ComparisonTable	Side-by-side product comparison
CartTable	Quantity, Remove, Total calculation
👨‍💻 Learning Outcomes

Redux Toolkit (createSlice, scalable store)

Advanced React hooks & optimization

State persistence using localStorage

Responsive design with Tailwind CSS

Production-ready build using Vite

🔮 Future Enhancements

Real API integration

User authentication

Payment gateway

Admin dashboard

Order management

PWA support

Dark mode

📚 Skills Demonstrated

React 18, Vite, Tailwind CSS

Redux Toolkit (advanced usage)

Performance optimization

Component-based architecture

Clean, scalable frontend design

