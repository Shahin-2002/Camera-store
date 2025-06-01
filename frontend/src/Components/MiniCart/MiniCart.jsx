import React from 'react';
import './MiniCart.css';
import { useRemoveFromCart } from '../../hooks/useRemoveFromCart';
import { useUpdateCartItem } from '../../hooks/useUpdateCartItem';
import { Link } from 'react-router-dom';

export default function MiniCart({ cartItems }) {
  const { mutate: removeFromCart, isPending } = useRemoveFromCart();
  const { mutate: updateCartItem } = useUpdateCartItem();


  const handleIncrease = (productId, currentQuantity) => {
    updateCartItem({ productId, quantity: currentQuantity + 1 });
  };

  const handleDecrease = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartItem({ productId, quantity: currentQuantity - 1 });
    }
  };

  return (
    <div
      className={`mini-cart ${cartItems.length === 0 ? 'caption-cart' : ''}`}
    >
      {cartItems.length === 0 ? (
        <p>سبد خرید خالی است.</p>
      ) : (
        cartItems.map((item) => (
          
            <div className="mini-cart-item" key={item.id}>
              <img src={item.product.images[0].image} alt={item.name} />
              {console.log(item.product.images[0].image)}
              <div>
                <p>{item.name}</p>
                <p>{item.price.toLocaleString('fa-IR')} تومان</p>
                <div>
                  <button
                    onClick={() =>
                      handleDecrease(item.product.id, item.quantity)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleIncrease(item.product.id, item.quantity)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.product.id)}>
                🗑️
              </button>
            </div>
          
        ))
      )}
      {cartItems.length === 0 ? (
        ''
      ) : (
        <Link to="/buy-product" className="checkout-btn-link">
          <button className="checkout-btn">تسویه حساب</button>
        </Link>
      )}
    </div>
  );
}
