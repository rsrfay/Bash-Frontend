import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useCart } from "@/context/CartContext";
import DescriptionPage from "@/app/description/[id]/page";

// jest.mock("CartContext", () => ({
//   useCart: jest.fn(),
// }));

describe("DescriptionPage - handleAddToCart", () => {
  const addToCartMock = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addToCart: addToCartMock,
    });
    jest.clearAllMocks();
  });

  test("adds product to cart with correct details", async () => {
    const mockProduct = {
      id: 102,
      Drink_Name: "Americano",
      Description: "An Americano is made by diluting an espresso shot with hot water for a smooth, robust coffee.",
      Price: { hotPrice: 60, coldPrice: 65 },
      DrinkType: "Hot/Cold",
      Tag: ["Coffee"],
      isRecommended: true,
      img_src: "americano.png",
      category: "Beverage",
      AddOns: [{ name: "Oat Milk", price: 15 }],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      })
    ) as jest.Mock;

    await act(async () => {
      render(<DescriptionPage />);
    });

    // Set sweetness and type as required by the input structure
    fireEvent.click(screen.getByText("30%")); // Set sweetness to "30%"
    fireEvent.click(screen.getByText("Cold")); // Set type to "Cold"

    // Simulate clicking Add to Cart button without selecting add-ons
    fireEvent.click(screen.getByText("Add to Cart"));

    // Verify addToCartMock was called with the expected structure
    expect(addToCartMock).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: 102,
        itemName: "Americano",
        itemDetails: "An Americano is made by diluting an espresso shot with hot water for a smooth, robust coffee.",
        category: "Beverage",
        addOns: [], // No add-ons selected, should be an empty array
        quantity: 1,
        price: 60, // Should match the "Cold" price of 60
        image: "http://localhost:3030/americano.png",
        sweetness: "30%", // Confirm selected sweetness level
        type: "Cold", // Confirm selected type
      })
    );

    // Verify modal success message appears
    expect(screen.getByText("Item added to cart successfully!")).toBeInTheDocument();
  });
});
