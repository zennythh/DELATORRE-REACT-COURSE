import axios from 'axios'
import dayjs from 'dayjs'
import { formatMoney } from '../../utils/money'

export function DeliveryOptions({ cartItem, deliveryOpts, getCartItems }){
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {deliveryOpts.map((deliveryOption)=> {
        let priceString = "FREE Shipping"

        if(deliveryOption.priceCents > 0){
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`                      
        }

        const updateDeliveryOpt = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id
          })
          await getCartItems()
        }

      
        return(
          <div key={deliveryOption.id} className="delivery-option"
            onClick={updateDeliveryOpt}
          >
        <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId}
          onChange={()=>{}} 
          className="delivery-option-input"
          name={`delivery-option-${cartItem.productId}`} />
        <div>
          <div className="delivery-option-date">
            {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>
          <div className="delivery-option-price">
            {priceString}
          </div>
        </div>
      </div>
        );
      })}              
    </div>
  );
}