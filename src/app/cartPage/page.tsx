"use client";

import React from "react";
import styles from "./cartPage.module.css";
import CartItem from "../components/CartItem/CartItem";

const CartPage: React.FC = () => {
  return (
    <div className={styles.cartPageContainer}>
      <button className={styles.backButton}>&lt; Back</button>
      <header className={styles.header}>
        <h2 className={styles.cartTitle}>My Cart</h2>
        <button className={styles.cancelButton}>Cancel</button>
      </header>

      <div className={styles.cartItemsContainer}>
        <CartItem
          itemName="Latte"
          itemDetails="Iced, Oat Milk, 0%"
          quantity={2}
          price={70}
        />
        <CartItem
          itemName="Cookie"
          itemDetails="Chocolate"
          quantity={1}
          price={65}
        />
      </div>
      <footer></footer>
    </div>
  );
};

export default CartPage;
