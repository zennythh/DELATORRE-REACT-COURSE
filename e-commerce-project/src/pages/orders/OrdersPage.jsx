import axios from 'axios'
import dayjs from 'dayjs'
import { useState, useEffect, Fragment } from 'react'
import { Header } from '../../components/Header'
import { OrdersGrid } from './OrdersGrid'
import { formatMoney } from '../../utils/money'
import '../../styles/OrdersPage.css'
import OrdersIcon from '../../images/orders-favicon.png'

export function OrdersPage({ cartItems, getCartItems }){
  const [ orders, setOrders ] = useState([])

  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data)
      })
  }, [])
  
  return (
    <>
      <link rel="icon" href={OrdersIcon} />
      <title> Orders </title>
      <Header cartItems={cartItems}/>
  
      <div className="orders-page">
        <div className="page-title">Your Orders</div>  
        <OrdersGrid orders={orders} getCartItems={getCartItems}/>
      </div>
    </>    
  );
}