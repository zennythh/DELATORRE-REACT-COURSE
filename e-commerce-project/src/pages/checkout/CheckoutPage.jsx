import axios from 'axios'
import { useState, useEffect } from 'react'
import { CheckoutHeader } from './CheckoutHeader'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import './CheckoutPage.css'
import CartIcon from '../../images/cart-favicon.png'

export function CheckoutPage({ cartItems, setCartItems }){
  const [ deliveryOpts, setDeliveryOpts ] = useState([])
  const [ paymentSummary, setPaymentSummary ] = useState(null)
  
  useEffect(()=>{
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime') 
      .then((response) => {
        setDeliveryOpts(response.data)
      })    

    axios.get('/api/payment-summary')
      .then((response) => {
        setPaymentSummary(response.data)
      })
  }, [])
  
  return (
    <>
      <link rel="icon" href={CartIcon} />
      <title>Checkout</title>
      
      <CheckoutHeader />
  
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
  
        <div className="checkout-grid">
          <OrderSummary cartItems={cartItems} deliveryOpts={deliveryOpts} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}