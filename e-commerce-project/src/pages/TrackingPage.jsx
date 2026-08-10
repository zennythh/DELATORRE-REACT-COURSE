import axios from 'axios'
import dayjs from 'dayjs'
import { Link, useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import '../styles/TrackingPage.css'
import TrackingIcon from '../images/tracking-favicon.png';

export function TrackingPage({cartItems}){
  const {orderId, productId} = useParams()
  const [ order, setOrder] = useState(null)
  
  useEffect(() => {
  async function loadOrder() {
    const response = await axios.get(
      `/api/orders/${orderId}?expand=products`
    );
    console.log(response.data);
    setOrder(response.data);
  }

  loadOrder();
}, [orderId]);

  if (!order) {
    return null
  }
  
  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId
  })  
  
  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs  
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs  
  let deliveryProgress = (timePassedMs / totalDeliveryTimeMs) * 100
  if (deliveryProgress > 100) deliveryProgress = 100

  let isPreparing, isShipping, isDelivered;
  if (deliveryProgress < 33){
    isPreparing = true
  } else if (deliveryProgress >= 33 && deliveryProgress < 66) {
    isShipping = true
  } else { isDelivered = true}
  
  return (
    <>
    <link rel="icon" href={TrackingIcon} />
    <title> Tracking </title>
    <Header cartItems={cartItems}/>
    <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>

        <div className="delivery-date">
          Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd MMMM D')}
        </div>

        <div className="product-info">
          {orderProduct.product.name}
        </div>

        <div className="product-info">
          Quantity: {orderProduct.quantity}
        </div>

        <img className="product-image" src={orderProduct.product.image} />

        <div className="progress-labels-container">
          <div className={`progress-label ${isPreparing && 'current-status'}`}>
            Preparing
          </div>
          <div className={`progress-label ${isShipping && 'current-status'}`}>
            Shipped
          </div>
          <div className={`progress-label ${isDelivered && 'current-status'}`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar"
            style={{width:`${deliveryProgress}%`}}
          ></div>
        </div>
      </div>
    </div>
    </>
  );
}