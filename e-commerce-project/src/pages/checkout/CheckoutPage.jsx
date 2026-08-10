import axios from 'axios'
import { useState, useEffect } from 'react'
import { CheckoutHeader } from './CheckoutHeader'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import './CheckoutPage.css'
import CartIcon from '../../images/cart-favicon.png'

export function CheckoutPage({ cartItems, getCartItems }){
  const [ deliveryOpts, setDeliveryOpts ] = useState([])
  const [ paymentSummary, setPaymentSummary ] = useState(null)
  
  useEffect(()=>{
    const getDeliveries = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime') 
        setDeliveryOpts(response.data)
    }
    const getPaymentSummaries = async () => {
      const response = await axios.get('/api/payment-summary')
        setPaymentSummary(response.data)
    }
    getDeliveries()
    getPaymentSummaries()    
  }, [cartItems])
  
  return (
    <>
      <link rel="icon" href={CartIcon} />
      <title>Checkout</title>
      
      <CheckoutHeader cartItems={cartItems}/>
  
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
  
        <div className="checkout-grid">
          <OrderSummary cartItems={cartItems} getCartItems={getCartItems} deliveryOpts={deliveryOpts} />
          <PaymentSummary paymentSummary={paymentSummary} getCartItems={getCartItems} />
        </div>
      </div>
    </>
  );
}