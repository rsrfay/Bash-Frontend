"use client";
import React, { useState } from "react";
import "./Card.css";

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
    <div className="card">
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
        <button> </button>
        <input type="text" value="0" readOnly aria-label="quantity" />
        <button>+</button>
      </div>
    </div>
  );
};

export default Card;
