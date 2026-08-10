import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {
  const [ cartItems, setCartItems ] = useState([]);
  const getCartItems = async () => {
      const response = await axios.get('http://localhost:3000/api/cart-items?expand=product')
      setCartItems(response.data);
  }
  
  useEffect(() => {
    getCartItems()        
  }, [])
  
  return (
    <Routes>
    <Route index element={<HomePage cartItems={cartItems} setCartItems={setCartItems} getCartItems={getCartItems}/>} /> 
    <Route path="checkout" element={<CheckoutPage cartItems={cartItems} getCartItems={getCartItems}/>} />
    <Route path="orders" element={<OrdersPage cartItems={cartItems} setCartItems={setCartItems}/>} />
    <Route path="tracking/:orderId/:productId" element={<TrackingPage cartItems={cartItems}/>} />
    <Route path="*" element={<NotFoundPage cartItems={cartItems}/>} />
    </Routes>
  )
}

export default App
