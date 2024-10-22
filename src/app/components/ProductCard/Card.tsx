"use client";
import React, { useState } from "react";
import "./Card.css";
import Link from "next/link";

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
        <div className="card-price">
          <span>{hotPrice}.-</span>
        </div>
        <div className="card-quantity">
          <button>-</button>
          <input type="text" value="0" readOnly aria-label="quantity" />
          <button>+</button>
        </div>
      </Link>
    </div>
    </main>
  );
};

export default Card;
