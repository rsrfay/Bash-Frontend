import React from "react";
import styles from "./CartItem.module.css";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

type CartItemProps = {
  id: number;
  itemName: string;
  itemDetails: string;
  quantity: number;
  price: number;
  image: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  isSelectMode: boolean;
};

const CartCardItem: React.FC<CartItemProps> = ({
  id,
  itemName,
  itemDetails,
  quantity,
  price,
  image,
  onIncrease,
  onDecrease,
  onRemove,
  isSelectMode,
}) => {
  const router = useRouter();

  return (
    <div
      className={styles.cartItemContainer}
      onClick={() => router.push(`/description/${id}`)}
    >
      <div className={styles.imagePlaceholder}>
        <img src={image} className="card-image" />
      </div>
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{itemName}</h3>
        <p className={styles.itemDetails}>{itemDetails}</p>
        <div className={styles.quantityControl}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDecrease();
            }}
            className={styles.decrementButton}
          >
            -
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onIncrease();
            }}
            className={styles.incrementButton}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.itemPrice}>
        {isSelectMode ? (
          <div
            className={styles.removeButton}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <FaTrash className={styles.trashIcon} />
          </div>
        ) : (
          <span>{price * quantity} Baht</span>
        )}
      </div>
    </div>
  );
};

export default CartCardItem;
