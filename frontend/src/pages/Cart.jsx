import React from 'react';
import useCart from '../hooks/useCart';
import CartPage from '../components/Cart/CartPage';

export default function Cart({ user }) {
  const { cart, remove } = useCart(user);
  return <CartPage cart={cart} onRemove={remove} />;
}
