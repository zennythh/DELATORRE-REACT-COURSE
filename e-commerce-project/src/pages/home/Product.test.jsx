import { it, expect, describe, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { Product } from './Product'

vi.mock('axios')

describe('Product component', () => {
  let product 
  let getCartItems
  let addToCartBtn
  let user = userEvent.setup()

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    } 
    getCartItems= vi.fn()   
    render(<Product product={product} getCartItems={getCartItems}/>)
    addToCartBtn = screen.getByTestId('addtocart-btn')
  }) 
  
  it('displays product details correctly', () => {
    expect(
      screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      screen.getByText('$10.90')).toBeInTheDocument();

    expect(
      screen.getByTestId('product-images')
    ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg')

    expect(
      screen.getByTestId('product-stars')
    ).toHaveAttribute('src', 'images/ratings/rating-45.png')

    expect(
      screen.getByText('87').toBeInTheDocument
    )
  })

  it('has a functional add to cart btn', async () => {
    
    await user.click(addToCartBtn)

    expect(axios.post).toHaveBeenCalled(
      '/api/cart-items',
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1
      }
    )
    expect(getCartItems).toHaveBeenCalled()
    })

  it('has a functional quantity selector', async () => {
    const quantitySelector = screen.getByTestId('quantity-selector')  
    await user.selectOptions(quantitySelector, "3")
    await user.click(addToCartBtn)
    
    expect(
      quantitySelector
    ).toHaveValue('3')

    expect(axios.post).toHaveBeenCalled(
      '/api/cart-items',
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 3
      }
    )

    expect(getCartItems).toHaveBeenCalled()
    
  })
});