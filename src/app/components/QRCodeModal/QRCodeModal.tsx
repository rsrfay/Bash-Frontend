import React, { useState } from 'react';
import { IoCopyOutline, IoCloseOutline } from 'react-icons/io5';
import styles from './QRCodeModal.module.css';

interface QRCodeModalProps {
  amount: number;
  phoneNumber?: string;
  nationalId?: string;
  onClose?: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ 
  amount, 
  phoneNumber, 
  nationalId,
  onClose 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate PromptPay ID - prefer phone number over national ID
  const promptpayId = phoneNumber || nationalId || "0000000000";
  
  // Format phone number to remove any non-digit characters
  const formattedId = promptpayId.replace(/\D/g, "");
  
  // Generate QR code URL from promptpay.io
  const qrCodeUrl = `https://promptpay.io/${formattedId}/${amount}`;

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amount.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleModalOpen = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setShowModal(false);
    document.body.style.overflow = 'unset';
    onClose?.();
  };

  return (
    <>
      <button 
        onClick={handleModalOpen}
        className={styles.generateButton}
      >
        Make a payment
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
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
              {/* QR Code Image */}
              <div className={styles.qrCodeContainer}>
                <img
                  src={qrCodeUrl}
                  alt="PromptPay QR Code"
                  className={styles.qrCode}
                />
              </div>
              
              {/* Amount Display */}
              <div className={styles.amountContainer}>
                <div className={styles.amountInfo}>
                  <span className={styles.label}>Amount</span>
                  <span className={styles.amount}>฿{amount.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCopyAmount}
                  className={styles.copyButton}
                >
                  {copied ? (
                    <span className={styles.copiedText}>Copied!</span>
                  ) : (
                    <IoCopyOutline size={20} />
                  )}
                </button>
              </div>

              {/* Recipient ID Display */}
              <div className={styles.recipientContainer}>
                <span className={styles.label}>Recipient ID</span>
                <p className={styles.recipientId}>{promptpayId}</p>
              </div>

              {/* Instructions */}
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