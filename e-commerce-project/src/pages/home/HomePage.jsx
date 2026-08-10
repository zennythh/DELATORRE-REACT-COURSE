import axios from 'axios'
import { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid'
import '../../styles/HomePage.css'
import HomeIcon from '../../images/home-favicon.png'

export function HomePage({ cartItems, setCartItems, getCartItems }){
  const [ products, setProducts ] = useState([]);
  
  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products')
      setProducts(response.data);
     }
      getHomeData()
  }, [])

  
  return (
    <>
      <link rel="icon" href={HomeIcon} />
      <title> Ecommerce Project </title>

      <Header cartItems={cartItems}/>
      <div className="home-page">
      <ProductsGrid products={products} getCartItems={getCartItems}/>
    </div>
    </>
  );
}