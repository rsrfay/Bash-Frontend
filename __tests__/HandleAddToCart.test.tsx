import { handleAddToCart } from "@/lib/utilsCart";
import { CartItemType } from "@/context/CartContext";

describe("Test handleAddToCart Function", () => {
  const mockAddToCart = jest.fn().mockImplementation((item: CartItemType) => 1); // Mock addToCart to return cart length of 1

  // T1 Base Choice:  (C1b2, C2b2, C3b2, C4b2, C5b2, C6b2, C7b2)
  // Test Valid product, valid quantity and displayTotalPrice, non-empty sweetness and type
  it("should add a product to the cart with the correct details", () => {
    const product = {
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
    const quantity = 1;
    const displayTotalPrice = 60;
    const sweetness = "50%";
    const type = "Hot";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(true);
    expect(result.cartLength).toBe(1); // Check if mockAddToCart returned 1
    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: product.id,
        itemName: product.Drink_Name,
        quantity,
        price: displayTotalPrice,
        addOns: ["Oat Milk"],
        sweetness,
        type,
      })
    );
  });

  // T2 (C1b2, C2b1, C3b2, C4b2, C5b2, C6b2, C7b2)
  // Test with valid product but no selected add-ons
  it("should add a product without add-ons to the cart", () => {
    const product = {
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

    const selectedAddOns = ([] = []);
    const quantity = 1;
    const displayTotalPrice = 50; // Only the base price
    const sweetness = "50%";
    const type = "Hot";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(true);
    expect(result.cartLength).toBe(1); // Check if mockAddToCart returned 1
    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: product.id,
        itemName: product.Drink_Name,
        quantity,
        price: displayTotalPrice,
        addOns: [], // No add-ons
        sweetness,
        type,
      })
    );
  });

  // T3 (C1b2, C2b2, C3b1, C4b2, C5b2, C6b2, C7b2)
  // Test invalid quantity (zero quantity)
  it("should return an error if quantity is negative or zero", () => {
    const product = {
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
    const quantity = 0;
    const displayTotalPrice = 60;
    const sweetness = "50%";
    const type = "Hot";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(false);
    expect(result.message).toBe("Product quantity is invalid");
    expect(mockAddToCart).not.toHaveBeenCalled(); // addToCart should not be called when quantity and displayTotalPrice are invalid
  });

  // T4 (C1b2, C2b2, C3b3, C4b2, C5b2, C6b2, C7b2)
  // Test invalid quantity (Not a number quantity)
  it("should return an error if quantity is not a number", () => {
    const product = {
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
    const quantity = NaN;
    const displayTotalPrice = 60;
    const sweetness = "50%";
    const type = "Hot";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(false);
    expect(result.message).toBe("Product quantity is invalid");
    expect(mockAddToCart).not.toHaveBeenCalled(); // addToCart should not be called when quantity and displayTotalPrice are invalid
  });

  // T5 (C1b2, C2b2, C3b2, C4b1, C5b2, C6b2, C7b2)
  // Test invalid total price (negative total price)
  it("should return an error if total price is negative or zero", () => {
    const product = {
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
    const quantity = 1;
    const displayTotalPrice = -1;
    const sweetness = "50%";
    const type = "Hot";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(false);
    expect(result.message).toBe("Product total price is invalid");
    expect(mockAddToCart).not.toHaveBeenCalled(); // addToCart should not be called
  });

  // T6 (C1b2, C2b2, C3b2, C4b3, C5b2, C6b2, C7b2)
  // Test invalid total price (Not a number total price)
  it("should return an error if total price is not a number", () => {
    const product = {
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
    const quantity = 1;
    const displayTotalPrice = NaN;
    const sweetness = "50%";
    const type = "Hot";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(false);
    expect(result.message).toBe("Product total price is invalid");
    expect(mockAddToCart).not.toHaveBeenCalled(); // addToCart should not be called
  });

  // T7(C1b2, C2b2, C3b2, C4b2, C5b1, C6b2, C7b2)
  // Test invalid product category (empty)
  it("should return an error if category is invalid", () => {
    const product = {
      id: 101,
      Drink_Name: "Americano",
      Description: "A rich espresso with added water for a smooth coffee.",
      Price: { hotPrice: 50, coldPrice: 55 },
      DrinkType: "Hot/Cold",
      Tag: ["Coffee"],
      isRecommended: true,
      img_src: "/images/americano.png",
      category: "",
      AddOns: [{ name: "Oat Milk", price: 10 }],
    };

    const selectedAddOns = [{ name: "Oat Milk", price: 10 }];
    const quantity = 1;
    const displayTotalPrice = 60;
    const sweetness = "50%";
    const type = "Hot";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(false);
    expect(result.message).toBe("Product category is invalid");
    expect(mockAddToCart).not.toHaveBeenCalled(); // addToCart should not be called
  });

  // T8 (C1b2, C2b2, C3b2, C4b2, C5b2, C6b1, C7b2)
  // Test invalid sweetness for the category Beverage (empty)
  it("should return an error if sweetness is empty for Beverage", () => {
    const product = {
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
    const quantity = 1;
    const displayTotalPrice = 60;
    const sweetness = "";
    const type = "Hot";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(false);
    expect(result.message).toBe("Product sweetness or type is invalid");
    expect(mockAddToCart).not.toHaveBeenCalled(); // addToCart should not be called
  });

  //T9 (C1b2, C2b2, C3b2, C4b2, C5b2, C6b2, C7b1)
  // Test invalid type for the category Beverage (empty)
  it("should return an error if type is empty for Beverage", () => {
    const product = {
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
    const quantity = 1;
    const displayTotalPrice = 60;
    const sweetness = "50%";
    const type = "";

    const result = handleAddToCart(
      product,
      selectedAddOns,
      quantity,
      displayTotalPrice,
      mockAddToCart,
      product.category,
      sweetness,
      type
    );

    // Assertions
    expect(result.success).toBe(false);
    expect(result.message).toBe("Product sweetness or type is invalid");
    expect(mockAddToCart).not.toHaveBeenCalled(); // addToCart should not be called
  });
});
