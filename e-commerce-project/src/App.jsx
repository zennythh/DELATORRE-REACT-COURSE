import { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {
  const [ cartItems, setCartItems ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cart-items?expand=product')
    .then((response) => {
      setCartItems(response.data);
    }) 
  }, [])
  
  return (
    <Routes>
    <Route index element={<HomePage cartItems={cartItems} setCartItems={setCartItems}/>} /> 
    <Route path="checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems}/>} />
    <Route path="orders" element={<OrdersPage cartItems={cartItems} setCartItems={setCartItems}/>} />
    <Route path="tracking" element={<TrackingPage/>} />
    <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  )
}

export default App
