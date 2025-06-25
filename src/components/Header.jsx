import { useContext, useEffect, useRef, useState } from 'react';

import Button from './UI/Button.jsx';
import logoImg from '../assets/quickplate.png';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import cartImg from '../assets/cart.svg';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const [pop, setPop] = useState(false);
  const prevCartCount = useRef(cartCtx.items.reduce((sum, item) => sum + item.quantity, 0));

  const totalCartItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (totalCartItems > prevCartCount.current) {
      setPop(true);
      const timer = setTimeout(() => setPop(false), 600); // match animation duration
      return () => clearTimeout(timer);
    }
    prevCartCount.current = totalCartItems;
  }, [totalCartItems]);

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
        <Button
          textOnly
          onClick={handleShowCart}
          className={pop ? 'cart-pop' : ''}
          style={{ transition: 'filter 0.3s, transform 0.3s' }}
        >
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
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