import React from "react";
import styles from "./PaymentItem.module.css";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

type PaymentItemProps = {
  id: number;
  itemName: string;
  itemDetails: string;
  quantity: number;
  price: number;
  image: string;
};

const PaymentCardItem: React.FC<PaymentItemProps> = ({
  id,
  itemName,
  itemDetails,
  quantity,
  price,
  image,
}) => {
  const router = useRouter();

  return (
    <div className={styles.paymentItemContainer}>
      <div className={styles.imagePlaceholder}>
        <img src={image} className="card-image" />
      </div>
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{itemName}</h3>
        <p className={styles.itemDetails}>{itemDetails}</p>
      </div>
      <div className={styles.itemPrice}>
        <span>{price * quantity} Baht</span>
      </div>
    </div>
  );
};

export default PaymentCardItem;
