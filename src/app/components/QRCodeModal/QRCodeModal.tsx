import React, { useState } from 'react';
import { IoCopyOutline, IoCloseOutline } from 'react-icons/io5';
import styles from './QRCodeModal.module.css';

interface QRCodeModalProps {
  amount: number;
  phoneNumber?: string;
  onClose?: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ 
  amount, 
  phoneNumber,
  onClose
}) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setShowModal(false);
    document.body.style.overflow = 'unset';
    onClose?.();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amount.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format PromptPay ID
  const formattedPhoneNumber = phoneNumber?.replace(/\D/g, "") || "";
  
  // Generate QR code URL
  const qrCodeUrl = `https://promptpay.io/${formattedPhoneNumber}/${amount.toFixed(2)}`;

  return (
    <>
      <button 
        onClick={handleModalOpen}
        className={styles.generateButton}
      >
        Make a payment
      </button>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>PromptPay QR Code</h3>
              <button 
                onClick={handleModalClose}
                className={styles.closeButton}
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            <div className={styles.contentWrapper}>
              <div className={styles.qrCodeContainer}>
                <img
                  src={qrCodeUrl}
                  alt="PromptPay QR Code"
                  className={styles.qrCode}
                />
              </div>
              
              <div className={styles.amountContainer}>
                <div className={styles.amountInfo}>
                  <span className={styles.label}>Amount</span>
                  <span className={styles.amount}>฿{amount.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCopyAmount}
                  className={styles.copyButton}
                  aria-label="Copy amount"
                >
                  {copied ? (
                    <span className={styles.copiedText}>Copied!</span>
                  ) : (
                    <IoCopyOutline size={20} />
                  )}
                </button>
              </div>

              <div className={styles.recipientContainer}>
                <span className={styles.label}>Recipient</span>
                <p className={styles.recipientId}>{phoneNumber}</p>
              </div>

              <div className={styles.instructions}>
                <p>1. Open your banking app</p>
                <p>2. Scan this QR code</p>
                <p>3. Verify the amount and recipient</p>
                <p>4. Complete the payment</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QRCodeModal;