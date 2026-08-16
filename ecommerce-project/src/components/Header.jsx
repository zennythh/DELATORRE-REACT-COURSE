import { NavLink, useNavigate, useSearchParams } from 'react-router'
import { useState } from 'react'
import '../styles/Header.css'
import LogoWhite from '../images/logo-white.png'
import MobileLogoWhite from '../images/mobile-logo-white.png'

export function Header({ cartItems }) {
  let totalQuantity = 0;

  const [searchKey, setSearchKey] = useState('')
  const navigate = useNavigate()

  cartItems.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const searchKeyPress = (event) => {
    setSearchKey(event.target.value)
  }

  const searchBtn = () => {
    navigate(`/?search=${searchKey}`)
  }

  return (
    <div className="header">

      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={LogoWhite} />
          <img className="mobile-logo" src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          value={searchKey}
          onChange={searchKeyPress}
          placeholder="Search"
        />

        <button
          className="search-button"
          onClick={searchBtn}
        >
          <img
            className="search-icon"
            src="images/icons/search-icon.png"
          />
        </button>
      </div>

      <div className="right-section">

        <NavLink
          className="orders-link header-link"
          to="/orders"
        >
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink
          className="cart-link header-link"
          to="/checkout"
        >
          <img
            className="cart-icon"
            src="images/icons/cart-icon.png"
          />

          <div className="cart-quantity">
            {totalQuantity}
          </div>

          <div className="cart-text">
            Cart
          </div>
        </NavLink>

      </div>
    </div>
  );
}