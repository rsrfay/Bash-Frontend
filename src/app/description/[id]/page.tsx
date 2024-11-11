"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./description.module.css";
import ReturnButton from "@/app/components/ReturnButton/ReturnButton";
import { useCart } from "@/context/CartContext";

interface AddOn {
  name: string;
  price: number;
}

interface Product {
  id: number; // Unified ID, can be Drink_ID or Bakery_ID
  Drink_Name?: string;
  Bakery_Name?: string;
  Description: string;
  Price: {
    hotPrice?: number | null;
    coldPrice?: number | null;
    singlePrice?: number | null;
  };
  DrinkType?: string; // Applicable for beverages only
  Tag: string[];
  isRecommended: boolean;
  img_src: string;
  category?: string; // Optional, could be used for custom categorization if needed
  AddOns?: AddOn[]; // List of available add-ons for this product
}
const baseURL = "http://localhost:3030";

export default function DescriptionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [type, setType] = useState("Hot"); // Default to "Hot" if both types are available
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]); // Store selected add-ons
  const [sweetness, setSweetness] = useState("50%");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Beverage");

  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3030/menu/${id}`);
        if (response.ok) {
          const data = await response.json();
          const product: Product = {
            id: data.Drink_ID || data.Bakery_ID,
            Drink_Name: data.Drink_Name,
            Bakery_Name: data.Bakery_Name,
            Description: data.Description,
            Price: data.Price,
            DrinkType: data.DrinkType,
            Tag: data.Tag,
            isRecommended: data.isRecommended,
            // img_src: data.img_src,
            img_src: data.img_src
              ? `${baseURL}/image/${data.img_src}` // Beverage images
              : data.image_src
              ? `${baseURL}/image/bakery/${data.image_src}` // Bakery images
              : `${baseURL}/image/default-image.png`, // Default image
            category:
              data.category || (data.Drink_Name ? "Beverage" : "Bakery"),
            AddOns: data.AddOns || [], // Add-ons if available
          };
          setProduct(product);
          setType(data.DrinkType?.includes("Hot") ? "Hot" : "Cold"); // Set default type
          setCategory(category);
        } else {
          console.error("Failed to fetch product data.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) {
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    const isBakery = !!product.Bakery_Name;

    const newCartItem = {
      id: Date.now(),
      productId: product.id,
      itemName: product.Drink_Name || product.Bakery_Name || "Unknown Product",
      itemDetails: product.Description,
      category: product.category || "Unknown Category",
      addOns: selectedAddOns.map((addOn) => addOn.name),
      quantity,
      price: displayTotalPrice,
      image: product.img_src,
      ...(isBakery ? {} : { sweetness, type }),
    };

    addToCart(newCartItem);
    setIsSuccess(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (isSuccess) {
      router.push("/"); // Redirect to homepage if successful
    } 
  };

  const handleAddOnClick = (selectedAddOn: AddOn) => {
    setSelectedAddOns((prevAddOns) => {
      if (prevAddOns.some((addOn) => addOn.name === selectedAddOn.name)) {
        return prevAddOns.filter((addOn) => addOn.name !== selectedAddOn.name);
      }
      return [...prevAddOns, selectedAddOn];
    });
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  // Calculate base price with add-ons for display
  const basePrice =
    type === "Hot" &&
    product.Price.hotPrice !== null &&
    product.Price.hotPrice !== undefined
      ? product.Price.hotPrice
      : type === "Cold" &&
          product.Price.coldPrice !== null &&
          product.Price.coldPrice !== undefined
        ? product.Price.coldPrice
        : product.Price.singlePrice !== null &&
            product.Price.singlePrice !== undefined
          ? product.Price.singlePrice
          : 0; // Default to 0 if all price fields are null or undefined

  const addOnTotal = selectedAddOns.reduce(
    (total, addOn) => total + addOn.price,
    0
  );
  const displayTotalPrice = basePrice + addOnTotal;
  return (
    <main>
      <ReturnButton />

      <div className={styles["description-page"]}>
        <div className={styles["product-details"]}>
          <Image
            src={product.img_src}
            alt={product.Drink_Name || product.Bakery_Name || "Product Image"}
            width={500}
            height={500}
            className={styles["product-image"]}
          />
          <h1 className="text-xl font-adlam text-[#674636] mb-5 text-left mt-7 font-extrabold">
            {product.Drink_Name || product.Bakery_Name}
          </h1>
          <p className={styles["product-description"]}>{product.Description}</p>

          <div className={styles["options"]}>
            {product.DrinkType && (
              <>
                <h2>Type</h2>
                <div className={styles["option-group"]}>
                  {(product.DrinkType === "Hot" ||
                    product.DrinkType === "Hot/Cold") && (
                    <button
                      className={
                        type === "Hot"
                          ? `${styles["option"]} ${styles["selected"]}`
                          : styles["option"]
                      }
                      onClick={() => setType("Hot")}
                    >
                      Hot
                    </button>
                  )}

                  {(product.DrinkType === "Cold" ||
                    product.DrinkType === "Hot/Cold") && (
                    <button
                      className={
                        type === "Cold"
                          ? `${styles["option"]} ${styles["selected"]}`
                          : styles["option"]
                      }
                      onClick={() => setType("Cold")}
                    >
                      Cold
                    </button>
                  )}
                </div>
              </>
            )}

            {product.AddOns && product.AddOns.length > 0 && (
              <>
                <h2>Add on</h2>
                <div className={styles["option-group"]}>
                  {product.AddOns.map((addOn) => (
                    <button
                      key={addOn.name}
                      className={
                        selectedAddOns.some(
                          (selected) => selected.name === addOn.name
                        )
                          ? `${styles["option"]} ${styles["selected"]}`
                          : styles["option"]
                      }
                      onClick={() => handleAddOnClick(addOn)}
                    >
                      {addOn.name} (+{addOn.price}.-)
                    </button>
                  ))}
                </div>
              </>
            )}

            {product.category === "Beverage" && (
              <>
                <h2>Choice of Sweetness</h2>
                <div className={styles["option-group"]}>
                  <button
                    className={
                      sweetness === "0%"
                        ? `${styles["option"]} ${styles["selected"]}`
                        : styles["option"]
                    }
                    onClick={() => setSweetness("0%")}
                  >
                    0%
                  </button>
                  <button
                    className={
                      sweetness === "30%"
                        ? `${styles["option"]} ${styles["selected"]}`
                        : styles["option"]
                    }
                    onClick={() => setSweetness("30%")}
                  >
                    30%
                  </button>
                  <button
                    className={
                      sweetness === "50%"
                        ? `${styles["option"]} ${styles["selected"]}`
                        : styles["option"]
                    }
                    onClick={() => setSweetness("50%")}
                  >
                    50%
                  </button>
                  <button
                    className={
                      sweetness === "75%"
                        ? `${styles["option"]} ${styles["selected"]}`
                        : styles["option"]
                    }
                    onClick={() => setSweetness("75%")}
                  >
                    75%
                  </button>
                  <button
                    className={
                      sweetness === "100%"
                        ? `${styles["option"]} ${styles["selected"]}`
                        : styles["option"]
                    }
                    onClick={() => setSweetness("100%")}
                  >
                    100%
                  </button>
                </div>
              </>
            )}

            <div className={styles["price"]}>
              <h3>
                <strong>Total Price:</strong>{" "}
                <span>{displayTotalPrice} .-</span>
              </h3>
            </div>
            <button className={styles["add-to-cart"]} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles["modal-overlay"]}>
          <div
            className={`${styles["modal-content"]} ${
              isSuccess ? styles["success"] : styles["failure"]
            }`}
          >
            <p>
              {isSuccess
                ? "Item added to cart successfully!"
                : "Failed to add item to cart."}
            </p>
            <button onClick={handleCloseModal}>
              {isSuccess ? "Close" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
