"use client";

import React, { useEffect, useState } from "react";
import styles from "./paymentpage.module.css";
import PaymentItem from "../components/PaymentItem/PaymentItem";
import ReturnButton from "../components/ReturnButton/ReturnButton";
import NavBar from "../components/Nav/Nav";
import { CartItemType, useCart } from "@/context/CartContext";

const PaymentPage: React.FC = () => {
  const { cartItems } = useCart();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.backButtonContainer}>
        <ReturnButton />
      </div>

      <div className={styles.miscContainer}>
        <p className={styles.myCart}>Order Summary</p>
      </div>

      <div className={styles.itemContainer}>
        {cartItems &&
          cartItems.map((item) => (
            <PaymentItem
              key={item.id}
              id={item.id}
              itemName={item.itemName}
              itemDetails={
                item.type +
                ", " +
                item.addOns.join(", ") +
                ", " +
                item.sweetness
              }
              quantity={item.quantity}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>

      <div className={styles.miscContainer}>
        <p className={styles.useOffers}>Use offers</p>
      </div>

      <div className={styles.promotionsContainer}>
        <div className={styles.membershipInputContainer}>
          <span className={styles.membershipLabel}>Membership: </span>
          <input
            className={styles.membershipInput}
            type="text"
            placeholder="091-XXX-XXXX"
          />
          <span className={styles.membershipScore}>7/10</span>
        </div>
        <div className={styles.promotions}>
          <button className={styles.promotionButton}>Promotion A</button>
          <button className={styles.promotionButton}>Promotion B</button>
          <button className={styles.promotionButton}>Promotion C</button>
        </div>
      </div>

      <div className={styles.totalSummary}>
        <div className={styles.totalRow}>
          <p className={styles.totalLabel}>
            Subtotal ({cartItems && cartItems.length} items)
          </p>
          <p className={styles.totalAmount}>
            {cartItems &&
              cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
          </p>
        </div>
        <div className={styles.totalRow}>
          <p className={styles.totalDiscount}>Discount</p>
          <p className={styles.totalAmountDiscount}>0</p>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.totalContainer}>
          <p>Total</p>
          <p>
            {cartItems &&
              cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}{" "}
            Baht
          </p>
        </div>
        <button className={styles.nextButton}>Make a payment</button>
      </div>
    </main>
  );
};

export default PaymentPage;
