"use client";

import React, { useEffect, useState } from "react";
import styles from "./paymentpage.module.css";
import PaymentItem from "../components/PaymentItem/PaymentItem";
import ReturnButton from "../components/ReturnButton/ReturnButton";
import NavBar from "../components/Nav/Nav";
import { CartItemType, useCart } from "@/context/CartContext";

const baseURL = "http://localhost:3030";

const PaymentPage: React.FC = () => {
  const { cartItems } = useCart();
  const [tel, setTel] = useState("");
  const [unformattedTel, setUnformattedTel] = useState("");
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const [telChecked, setTelChecked] = useState(false);
  const [membershipPoints, setMembershipPoints] = useState<number | null>(null);

  interface MemberInfo {
    MID: string;
    Mname: string;
    Tel: string;
    Points: number;
    Alumni: boolean;
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleMembershipCheck = async () => {
    try {
      const response = await fetch(`${baseURL}/member/${unformattedTel}`);
      if (response.ok) {
        const data = await response.json();
        setMemberInfo(data);
        setMembershipPoints(data.Points);
      } else {
        throw new Error("Failed to fetch membership info");
      }
    } catch (error) {
      console.error("Error fetching membership info:", error);
      setMemberInfo(null);
      setMembershipPoints(null);
      setTel("");
    }
  };

  const handleMakePayment = async () => {
    if (memberInfo) {
      try {
        const response = await fetch(`${baseURL}/member/add-points`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MID: memberInfo.MID,
            points: 1,
          }),
        });
        if (response.ok) {
          setMembershipPoints((prevPoints) =>
            prevPoints !== null ? prevPoints + 1 : null
          );
        } else {
          throw new Error("Failed to update membership points");
        }
      } catch (error) {
        console.error("Error adding points to member:", error);
      }
    } else {
      console.error("Payment successful!");
    }
  };

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
        {cartItems &&
          cartItems.map((item) => (
            <PaymentItem
              key={item.id}
              id={item.id}
              itemName={item.itemName}
              itemDetails={
                item.type +
                ", " +
                item.addOns.join(", ") +
                ", " +
                item.sweetness
              }
              quantity={item.quantity}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>

      <div className={styles.miscContainer}>
        <p className={styles.useOffers}>Use offers</p>
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
              onClick={() => {
                handleMembershipCheck();
                setTelChecked(true);
              }}
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
          <button className={styles.promotionButton}>Promotion A</button>
          <button className={styles.promotionButton}>Promotion B</button>
          <button className={styles.promotionButton}>Promotion C</button>
        </div>
      </div>

      <div className={styles.totalSummary}>
        <div className={styles.totalRow}>
          <p className={styles.totalLabel}>
            Subtotal ({cartItems && cartItems.length} items)
          </p>
          <p className={styles.totalAmount}>
            {cartItems &&
              cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
          </p>
        </div>
        <div className={styles.totalRow}>
          <p className={styles.totalDiscount}>Discount</p>
          <p className={styles.totalAmountDiscount}>0</p>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.totalContainer}>
          <p>Total</p>
          <p>
            {cartItems &&
              cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}{" "}
            Baht
          </p>
        </div>
        <button className={styles.nextButton} onClick={handleMakePayment}>
          Make a payment
        </button>
      </div>
    </main>
  );
};

export default PaymentPage;
