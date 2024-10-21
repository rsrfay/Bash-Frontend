import React from "react";
import styles from "./CartItem.module.css";

type CartItemProps = {
  itemName: string;
  itemDetails: string;
  quantity: number;
  price: number;
  image: string
};

const CartCardItem: React.FC<CartItemProps> = ({
  itemName,
  itemDetails,
  quantity,
  price,
  image,
}) => {
  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.imagePlaceholder}>
        <img src={image}  className="card-image" />
      </div>
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
    </div>
  );
};

export default CartCardItem;
