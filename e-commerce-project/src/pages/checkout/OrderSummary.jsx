import dayjs from 'dayjs'
import { DeliveryOptions } from './DeliveryOptions'
import { DeliveryDate } from './DeliveryDate'
import { CartItemDetails } from './CartItemDetails'
import { formatMoney } from '../../utils/money'

export function OrderSummary( {deliveryOpts, cartItems, getCartItems }){
  return(
    <div className="order-summary">
      {deliveryOpts.length > 0 && cartItems.map((cartItem) => {
      
        return (
          <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate cartItem={cartItem} deliveryOpts={deliveryOpts} />
            <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image} />             
              <CartItemDetails cartItem={cartItem} />
            </div>
          <DeliveryOptions cartItem={cartItem} getCartItems={getCartItems} deliveryOpts={deliveryOpts} />
        </div>
        );
      })}
    </div>
  ); 
}