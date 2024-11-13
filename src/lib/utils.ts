import { CartItemType } from "../context/CartContext";
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

// add to cart function in description/[id]
export function handleAddToCart(
  product: Product | null,
  selectedAddOns: AddOn[],
  quantity: number,
  displayTotalPrice: number,
  addToCart: (item: CartItemType) => number, // returns cart length or updated cart
  category = "Unknown Category",
  sweetness = "",
  type = ""
) {
  if (!product) {
    return { success: false, message: "Product not found" };
  }
  if (quantity < 1) {
    console.error("Quantity is invalid.");
    return { success: false, message: "Product quantity is invalid" };
  }
  if (displayTotalPrice <= 0) {
    console.error("Total Price is invalid.");
    return { success: false, message: "Product total price is invalid" };
  }

  const isBakery = !!product.Bakery_Name;

  const newCartItem: CartItemType = {
    id: Date.now(),
    productId: product.id,
    itemName: product.Drink_Name || product.Bakery_Name || "Unknown Product",
    itemDetails: product.Description,
    category,
    addOns: selectedAddOns.map((addOn) => addOn.name),
    quantity,
    price: displayTotalPrice,
    image: product.img_src,
    ...(isBakery ? {} : { sweetness, type }),
  };

  const cartLength = addToCart(newCartItem);
  return { success: true, cartLength };
}
