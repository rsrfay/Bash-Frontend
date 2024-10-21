import React from "react";
import styles from "./CartItem.module.css";

type CartItemProps = {
  itemName: string;
  itemDetails: string;
  quantity: number;
  price: number;
  image: string;
  onIncrease: () => void;
  onDecrease: () => void;
};

const CartCardItem: React.FC<CartItemProps> = ({
  itemName,
  itemDetails,
  quantity,
  price,
  image,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.imagePlaceholder}>
        <img src={image} className="card-image" />
      </div>
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{itemName}</h3>
        <p className={styles.itemDetails}>{itemDetails}</p>
        <div className={styles.quantityControl}>
          <button onClick={onDecrease} className={styles.decrementButton}>-</button>
          <span className={styles.quantity}>{quantity}</span>
          <button onClick={onIncrease} className={styles.incrementButton}>+</button>
        </div>
      </div>
      <div className={styles.itemPrice}>{price * quantity} Baht</div>
    </div>
  );
};

export default CartCardItem;
