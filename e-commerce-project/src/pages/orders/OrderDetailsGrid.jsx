import axios from 'axios'
import dayjs from 'dayjs'
import { Fragment } from 'react'

export function OrderDetailsGrid({ order, getCartItems }){
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {

        const addToCart = async () => {
          await axios.post('/api/cart-items', {
            productId: orderProduct.productId,
            quantity: 1
          })
          await getCartItems();
        }
      
        return (
          <Fragment key={orderProduct.id}> 
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary"
                onClick={addToCart}
              >
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <div className="product-actions">
                <a href={`/tracking/${order.id}/${orderProduct.productId}`}>
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}