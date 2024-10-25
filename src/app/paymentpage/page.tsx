"use client";

import React from "react";
import styles from "./paymentpage.module.css";
import CartItem from "../components/CartItem/CartItem";

const cartItems = [{
  id: 1,
  itemName: "Americano",
  itemDetails: "Freshly brewed coffee",
  quantity: 1,
  price: 20,
  image: "/images/drinks/americano.png",
}]

const paymentpage: React.FC = () => {
  return (
    <main>
      <div className={styles.backButtonContainer}>
        <p onClick={() => window.location.href = '/cartPage'}>&lt; Back</p>
      </div>
      <div className={styles.miscContainer}>
        <p className={styles.myCart}>Order summary</p>
      </div>

      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          itemName={item.itemName}
          itemDetails={item.itemDetails}
          quantity={item.quantity}
          price={item.price}
          image={item.image}
        />
      ))}
      
<div className={styles.miscContainer}>
  <p className={styles.useOffers}>Use offers </p>
</div>


      <footer className={styles.footer}>
        <div className={styles.totalContainer}>
          <p>Total</p>
          <p>100 Baht</p>
        </div>
        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton}>Make a payment</button>
        </div>
      </footer>
    </main>
  );
};

export default paymentpage;
