import axios from 'axios'
import { useState } from 'react'
import { formatMoney } from '../../utils/money'

export function CartItemDetails({ cartItem, getCartItems }){
  const [ updatingQuant, setUpdatingQuant ] = useState(false);
  const [ quantity, setQuantity ] = useState(cartItem.quantity)
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`)
    await getCartItems()
  }

  const quantityEditing = async () => {
  if (!updatingQuant) {
    setUpdatingQuant(true)
  } else {
    console.log('Quantity being sent:', quantity)

    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity
    })

    setUpdatingQuant(false)
    await getCartItems()
  }
  }

  const quantityKeydown = async (event) => {
    if (event.key === 'Enter') {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity
      })
      setUpdatingQuant(false)
      await getCartItems()
  } else if (event.key === 'Escape'){
      setQuantity(cartItem.quantity)
      setUpdatingQuant(false)
  }
  }
  
  function quantityTyping(event) {
    setQuantity(Number(event.target.value))
  }
  
  return (
    <div className="cart-item-details">
      <div className="product-name">
        {cartItem.product.name}
      </div>
      <div className="product-price">
        {formatMoney(cartItem.product.priceCents)}
      </div>
      <div className="product-quantity">
        {updatingQuant ? <input className="quantity-input" 
          type="number" value={quantity} onChange={quantityTyping} 
          onKeyDown={quantityKeydown} /> : null}
        <span>
          Quantity: <span className="quantity-label">{!updatingQuant ? (cartItem.quantity) : null}</span>
        </span>
        <span className="update-quantity-link link-primary"
          onClick={quantityEditing}
        >
          Update
        </span>
        <span className="delete-quantity-link link-primary"
          onClick={deleteCartItem}
        >
          Delete
        </span>
      </div>
    </div>
  );
}