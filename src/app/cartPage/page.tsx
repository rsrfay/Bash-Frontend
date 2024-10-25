"use client";

import React, { useState } from "react";
import styles from "./cartPage.module.css";
import CartItem from "../components/CartItem/CartItem";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar/Nav";

const data = [
  {
    id: 1,
    itemName: "Americano",
    itemDetails: "Freshly brewed coffee 100%",
    quantity: 1,
    price: 20,
    image: "/images/drinks/americano.png",
  },
  {
    id: 4,
    itemName: "Es-Yen (Thai Style)",
    itemDetails: "Freshly cold 50%",
    quantity: 1,
    price: 20,
    image: "/images/drinks/Es-Yen Thai Style.png",
  },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(data);
  const [isSelectMode, setIsSelectMode] = useState(false);

  const updateItemQuantity = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleIncreaseQuantity = (id: number, currentQuantity: number) => {
    updateItemQuantity(id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateItemQuantity(id, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSelectToggle = () => {
    setIsSelectMode((prev) => !prev);
  };

  return (
    <main className="pt-10">
      <NavBar />
      <div className={styles.backButtonContainer}>
        <p>&lt; Back</p>
      </div>
      <div className={styles.miscContainer}>
        <p className={styles.myCart}>My Cart</p>
        <button
          className={
            isSelectMode ? styles.cancelButtonActive : styles.cancelButton
          }
          onClick={handleSelectToggle}
        >
          {isSelectMode ? "Cancel" : "Select"}
        </button>
      </div>

      <div className={styles.itemContainer}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            itemName={item.itemName}
            itemDetails={item.itemDetails}
            quantity={item.quantity}
            price={item.price}
            image={item.image}
            onIncrease={() => handleIncreaseQuantity(item.id, item.quantity)}
            onDecrease={() => handleDecreaseQuantity(item.id, item.quantity)}
            onRemove={() => handleRemoveItem(item.id)}
            isSelectMode={isSelectMode}
          />
        ))}
      </div>

      <footer className={styles.footer}>
        <div className={styles.totalContainer}>
          <p>Total</p>
          <p>
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}{" "}
            Baht
          </p>
        </div>
        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton}>Next</button>
        </div>
      </footer>
    </main>
  );
};

export default CartPage;
