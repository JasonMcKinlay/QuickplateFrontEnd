import { useContext } from 'react';

import Button from './UI/Button.jsx';
import logoImg from '../assets/quickplate.png';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import cartImg from '../assets/cart.svg';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>QuickPlate</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.1rem' }}>
              {totalCartItems}
            </span>
            <img src={cartImg} alt="Cart icon" id="cart-icon" />
          </span>
        </Button>
      </nav>
    </header>
  );
}
