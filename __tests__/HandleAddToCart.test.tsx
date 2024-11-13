import { handleAddToCart } from "@/lib/utils";
import { CartItemType } from "@/context/CartContext";

describe("handleAddToCart Utility Function", () => {
  const mockAddToCart = jest.fn().mockImplementation((item: CartItemType) => 1); // Mock addToCart to return cart length

  const sampleProduct = {
    id: 101,
    Drink_Name: "Americano",
    Description: "A rich espresso with added water for a smooth coffee.",
    Price: { hotPrice: 50, coldPrice: 55 },
    DrinkType: "Hot/Cold",
    Tag: ["Coffee"],
    isRecommended: true,
    img_src: "/images/americano.png",
    category: "Beverage",
    AddOns: [{ name: "Oat Milk", price: 10 }],
  };

  const selectedAddOns = [{ name: "Oat Milk", price: 10 }];
  const quantity = 2;
  const displayTotalPrice = 60;

  it("should add a product to the cart with the correct details", () => {
    const result = handleAddToCart(
      sampleProduct,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      sampleProduct.category,
      "50%", // sweetness
      "Hot" // type
    );

    // Assertions
    expect(result.success).toBe(true);
    expect(result.cartLength).toBe(1); // Check if mockAddToCart returned 1
    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: sampleProduct.id,
        itemName: sampleProduct.Drink_Name,
        quantity: 2,
        price: 60,
        addOns: ["Oat Milk"],
        sweetness: "50%",
        type: "Hot",
      })
    );
  });

  it("should return an error if product is null", () => {
    const result = handleAddToCart(
      null, // No product
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart
    );

    expect(result.success).toBe(false);
    expect(result.message).toBe("Product not found");
    expect(mockAddToCart).not.toHaveBeenCalled(); // addToCart should not be called when product is null
  });
});
