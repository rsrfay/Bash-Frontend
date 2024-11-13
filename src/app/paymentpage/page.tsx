"use client";

import React, { useEffect, useState } from "react";
import { MdLocalOffer } from "react-icons/md";
import styles from "./paymentpage.module.css";
import PaymentItem from "../components/PaymentItem/PaymentItem";
import ReturnButton from "../components/ReturnButton/ReturnButton";
import NavBar from "../components/Nav/Nav";
import QRCodeModal from "../components/QRCodeModal/QRCodeModal";
import { CartItemType, useCart } from "@/context/CartContext";

const baseURL = "http://localhost:3030";
const PROMPTPAY_NUMBER = "0000000000"; // Replace with your actual PromptPay number

interface MemberInfo {
  MID: string;
  Mname: string;
  Tel: string;
  Points: number;
  Alumni: boolean;
}

interface Promotion {
  Pro_ID: string;
  Promo_Description: string;
  start_date?: string;
  expiry_date?: string;
}

const PaymentPage: React.FC = () => {
  const { cartItems } = useCart();
  const [tel, setTel] = useState("");
  const [unformattedTel, setUnformattedTel] = useState("");
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const [telChecked, setTelChecked] = useState(false);
  const [membershipPoints, setMembershipPoints] = useState<number | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pointsRedeemed, setPointsRedeemed] = useState(false);

  // Fetch promotions on component mount
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(`${baseURL}/promotions`);
        if (!response.ok) {
          throw new Error("Failed to fetch promotions");
        }
        const data = await response.json();
        setPromotions(data);
      } catch (error) {
        setError("Failed to load promotions");
        console.error("Error fetching promotions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Save cart items to localStorage
  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleMembershipCheck = async () => {
    try {
      const response = await fetch(`${baseURL}/member/${unformattedTel}`);
      if (response.ok) {
        const data = await response.json();
        setMemberInfo(data);
        setMembershipPoints(data.Points);
        setTelChecked(true);
      } else {
        throw new Error("Failed to fetch membership info");
      }
    } catch (error) {
      console.error("Error fetching membership info:", error);
      setMemberInfo(null);
      setMembershipPoints(null);
      setTel("");
      setTelChecked(true);
    }
  };

  const handlePromotionSelect = async (promotion: Promotion) => {
    if (!memberInfo) return;

    // If selecting the same promotion, deselect it and restore points if necessary
    if (selectedPromotion?.Pro_ID === promotion.Pro_ID) {
      if (promotion.Pro_ID === "001" && pointsRedeemed) {
        try {
          const response = await fetch(`${baseURL}/member/add-points`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              MID: memberInfo.MID,
              points: 10
            })
          });

          if (response.ok) {
            const data = await response.json();
            setMembershipPoints(data.member.Points);
            setPointsRedeemed(false);
          } else {
            throw new Error("Failed to restore points");
          }
        } catch (error) {
          console.error("Error restoring points:", error);
          return;
        }
      }
      setSelectedPromotion(null);
      return;
    }

    // Handle new promotion selection
    if (promotion.Pro_ID === "001") {
      if (membershipPoints && membershipPoints >= 10) {
        try {
          const response = await fetch(`${baseURL}/member/redeem-points`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              MID: memberInfo.MID,
              points: 10
            })
          });

          if (response.ok) {
            const data = await response.json();
            setMembershipPoints(data.member.Points);
            setPointsRedeemed(true);
            setSelectedPromotion(promotion);
          } else {
            throw new Error("Failed to redeem points");
          }
        } catch (error) {
          console.error("Error redeeming points:", error);
        }
      }
    } else {
      setSelectedPromotion(promotion);
    }
  };
  
  const isPromotionValid = (promotion: Promotion): boolean => {
    if (promotion.Pro_ID === "001") {
      return membershipPoints !== null && membershipPoints >= 10;
    }

    if (!promotion.start_date || !promotion.expiry_date) return true;

    const now = new Date();
    const start = new Date(promotion.start_date);
    const expiry = new Date(promotion.expiry_date);

    return now >= start && now <= expiry;
  };

  const calculateDiscount = (): number => {
    if (!selectedPromotion || !cartItems || cartItems.length === 0) return 0;

    switch (selectedPromotion.Pro_ID) {
      case "001": {
        if (membershipPoints !== null && pointsRedeemed) {
          const lowestDrinkPrice = Math.min(
            ...cartItems.map(item => item.price)
          );
          return lowestDrinkPrice;
        }
        return 0;
      }
      case "002": {
        if (cartItems.length >= 2) {
          const secondItemPrice = cartItems[1].price;
          return secondItemPrice * 0.5;
        }
        return 0;
      }
      case "003": {
        if (memberInfo?.Alumni) {
          return 5;
        }
        return 0;
      }
      default:
        return 0;
    }
  };

  const subtotal = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ) ?? 0;

  const discount = calculateDiscount();
  const total = subtotal - discount;

  if (!cartItems) {
    return (
      <main className={styles.main}>
        <NavBar />
        <div className={styles.backButtonContainer}>
          <ReturnButton />
        </div>
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
        </div>
      </main>
    );
  }

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
        {cartItems.map((item) => (
          <PaymentItem
            key={item.id}
            id={item.id}
            itemName={item.itemName}
            type={item.type || ""}
            addOns={item.addOns || []}
            sweetness={item.sweetness || ""}
            quantity={item.quantity}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>

      <div className={styles.miscContainer}>
        <p className={styles.useOffers}>
          <MdLocalOffer className={styles.offerIcon} />
          Use offers
        </p>
      </div>

      <div className={styles.promotionsContainer}>
        <div className={styles.membershipInputContainer}>
          <span className={styles.membershipLabel}>Membership: </span>
          <input
            className={styles.membershipInput}
            type="text"
            placeholder="08X-XXX-XXXX"
            value={tel}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              setUnformattedTel(value);

              if (value.length > 3 && value.length <= 6) {
                value = value.replace(/(\d{3})(\d+)/, "$1-$2");
              } else if (value.length > 6) {
                value = value.replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3");
              }
              setTelChecked(false);
              setTel(value);
              setMembershipPoints(null);
              if (value === "") {
                setMemberInfo(null);
              }
            }}
          />
          {tel && !membershipPoints ? (
            <button
              className={styles.checkMembershipButton}
              onClick={handleMembershipCheck}
            >
              Check
            </button>
          ) : null}
          {membershipPoints !== null && telChecked ? (
            <span className={styles.membershipScore}>
              Points: {membershipPoints}
            </span>
          ) : (
            memberInfo === null &&
            telChecked && (
              <span className={styles.membershipInvalid}>
                Membership invalid
              </span>
            )
          )}
        </div>

        <div className={styles.promotions}>
          {isLoading ? (
            <p>Loading promotions...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            promotions.map((promotion) => {
              const isValid = isPromotionValid(promotion);
              const isSelected = selectedPromotion?.Pro_ID === promotion.Pro_ID;

              return (
                <button
                  key={promotion.Pro_ID}
                  className={`${styles.promotionButton} 
                    ${isSelected ? styles.selected : ""}
                    ${!isValid ? styles.disabled : ""}`}
                  onClick={() => handlePromotionSelect(promotion)}
                  disabled={!isValid}
                >
                  <div className={styles.promotionContent}>
                    <MdLocalOffer className={styles.promotionIcon} />
                    <span>
                      {promotion.Promo_Description}
                      {promotion.Pro_ID === "001" && (
                        <span className={styles.pointsIndicator}>
                          {membershipPoints !== null ? ` (${membershipPoints} points)` : ""}
                        </span>
                      )}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className={styles.totalSummary}>
        <div className={styles.totalRow}>
          <p className={styles.totalLabel}>
            Subtotal ({cartItems.length} items)
          </p>
          <p className={styles.totalAmount}>{subtotal}</p>
        </div>
        <div className={styles.totalRow}>
          <p className={styles.totalDiscount}>Discount</p>
          <p className={styles.totalAmountDiscount}>{discount}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.totalContainer}>
          <p>Total</p>
          <p>{total} Baht</p>
        </div>
        <QRCodeModal
          amount={total}
          phoneNumber={PROMPTPAY_NUMBER}
          // onPaymentSuccess={handlePaymentSuccess}
        />
      </div>
    </main>
  );
};

export default PaymentPage;