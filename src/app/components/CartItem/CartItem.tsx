import React from "react";
import styles from "./CartItem.module.css";

type CartItemProps = {
  itemName: string;
  itemDetails: string;
  quantity: number;
  price: number;
};

const CartCardItem: React.FC<CartItemProps> = ({
  itemName,
  itemDetails,
  quantity,
  price,
}) => {
  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.imagePlaceholder}></div>
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{itemName}</h3>
        <p className={styles.itemDetails}>{itemDetails}</p>
        <div className={styles.quantityControl}>
          <button className={styles.decrementButton}>-</button>
          <span className={styles.quantity}>{quantity}</span>
          <button className={styles.incrementButton}>+</button>
        </div>
      </div>
      <div className={styles.itemPrice}>{price * quantity} Baht</div>
      <button className={styles.deleteButton}>🗑️</button>
    </div>
  );
};

export default CartCardItem;
