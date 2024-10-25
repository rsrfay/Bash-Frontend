"use client";
import React, { useState } from "react";
import "./Card.css";
import Link from "next/link";
import { motion } from "framer-motion"; 

interface CardProps {
  id: number;
  name: string;
  description: string;
  hotPrice: string;
  coldPrice: string;
  category: string;
  TypeOfDrinks: string;
  isRecommended: boolean;
  image: string;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  description,
  hotPrice,
  coldPrice,
  isRecommended,
  image,
}) => {
  const truncatedDescription =
    description.length > 50
      ? description.substring(0, 50) + "..."
      : description;

      const displayPrice = () => {
        if (hotPrice !== "-" && coldPrice !== "-") {
          return (
            <div>
              <span>{hotPrice}.-  </span> | <span>{coldPrice}.- </span>
            </div>
          );
        } else if (hotPrice !== "-") {
          return <span>{hotPrice}.- </span>;
        } else if (coldPrice !== "-") {
          return <span>{coldPrice}.- </span>;
        } else {
          return <span>Price not available</span>;
        }
      };

  return (
    <main>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Montserrat:wght@400;700&display=swap"
      />
    <div className="card">
      <Link href={`/description/${id}`}>
        <img src={image} alt={name} className="card-image" />
        <h3 className="card-title">
          {name}
          {isRecommended && (
            <span role="img" aria-label="thumbs up">
              {" "}
              👍
            </span>
          )}
        </h3>
        <p className="card-description">{truncatedDescription}</p>
        <div className="card-price">{displayPrice()}</div>
        <div className="card-add-to-cart">
          <button>+</button>
        </div>
      </Link>
    </div>
    </main>
  );
};

export default Card;
