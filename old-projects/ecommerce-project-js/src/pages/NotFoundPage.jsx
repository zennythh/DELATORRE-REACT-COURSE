import { Header } from '../components/Header'
import '../styles/NotFoundPage.css'

export function NotFoundPage({ cartItems }){
  return (
    <>
      <title> 404 Not Found </title>
      <Header />
      <div className="msg-container">
        <p className="main-text"> 404 Not Found </p>
        <p className="sub-text"> Please ensure the link is correct and valid. </p>
      </div>
    </>
  );
}