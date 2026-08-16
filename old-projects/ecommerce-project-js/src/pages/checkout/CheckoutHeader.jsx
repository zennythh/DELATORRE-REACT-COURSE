import { Link } from 'react-router'
import './CheckoutHeader.css'
import Logo from '../../images/logo.png'
import MobileLogo from '../../images/mobile-logo.png'

export function CheckoutHeader({ cartItems }){
  let totalQuantity = 0;

  cartItems.forEach((cartItem)=> {
    totalQuantity += cartItem.quantity;
  });
  
  return (
    <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={Logo} />
              <img className="mobile-logo" src={MobileLogo} />
            </Link>
          </div>
  
          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link"
              to="/">{totalQuantity} items</Link>)
          </div>
  
          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
  );
}