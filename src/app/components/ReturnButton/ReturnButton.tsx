import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import styles from "./ReturnButton.module.css";

const ReturnButton: React.FC = () => {
  const router = useRouter();

  return (
    <div className="px-4 flex items-center py-4 mt-2">
      <a onClick={() => router.back()} className={styles.returnButton}>
        <span className={styles.iconText}>
          <AiOutlineLeft /> Return
        </span>
      </a>
    </div>
  );
};

export default ReturnButton;