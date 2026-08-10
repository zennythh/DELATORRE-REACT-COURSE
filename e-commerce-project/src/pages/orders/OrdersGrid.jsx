import dayjs from 'dayjs'
import { Fragment } from 'react'
import { OrderHeader } from './OrderHeader'
import { OrderDetailsGrid } from './OrderDetailsGrid'
import { formatMoney } from '../../utils/money'

export function OrdersGrid({ orders, getCartItems }){
  return (
    <div className="orders-grid">
      {orders.map((order) => {
      return (  
      <div key={order.id} className="order-container">
        <OrderHeader order={order} />
        <OrderDetailsGrid order={order} getCartItems={getCartItems}/>
      </div>
    )})}    
    </div>
  );
}