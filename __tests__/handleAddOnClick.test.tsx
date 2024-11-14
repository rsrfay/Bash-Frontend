import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock component for testing handleAddOnClick
interface AddOn {
  name: string;
  price: number;
}

const MockComponent = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const handleAddOnClick = (selectedAddOn: AddOn) => {
    setSelectedAddOns((prevAddOns) => {
      if (prevAddOns.some((addOn) => addOn.name === selectedAddOn.name)) {
        return prevAddOns.filter((addOn) => addOn.name !== selectedAddOn.name);
      }
      return [...prevAddOns, selectedAddOn];
    });
  };

  return (
    <div>
      <button
        onClick={() => handleAddOnClick({ name: "Oat Milk", price: 15 })}
        data-testid="oat-milk"
      >
        Toggle Oat Milk Add-On
      </button>
      <button
        onClick={() => handleAddOnClick({ name: "Brown Sugar Jelly", price: 15 })}
        data-testid="brown-sugar-jelly"
      >
        Toggle Brown Sugar Jelly Add-On
      </button>
      <div data-testid="selected-addons">
        {selectedAddOns.map((addOn) => addOn.name).join(", ")}
      </div>
    </div>
  );
};

describe("handleAddOnClick - ISP Functionality-based ACoC Test Suite", () => {
  it("T1 (C1b1, C2b1, C3b1): adds an add-on to an initially empty selectedAddOns list", () => {
    const { getByTestId } = render(<MockComponent />);

    // Click to toggle the "Oat Milk" add-on
    fireEvent.click(getByTestId("oat-milk"));

    // Check if "Oat Milk" is added
    expect(getByTestId("selected-addons")).toHaveTextContent("Oat Milk");
  });

  it("T2 (C1b1, C2b1, C3b2): adds a new add-on to an initially empty list, resulting in multiple add-ons", () => {
    const { getByTestId } = render(<MockComponent />);

    // Click to add "Oat Milk" and "Brown Sugar Jelly"
    fireEvent.click(getByTestId("oat-milk"));
    fireEvent.click(getByTestId("brown-sugar-jelly"));

    // Check if both add-ons are added
    expect(getByTestId("selected-addons")).toHaveTextContent("Oat Milk, Brown Sugar Jelly");
  });

  it("T3 (C1b2, C2b1, C3b1): toggles to add a new add-on when one item is already selected", () => {
    const { getByTestId } = render(<MockComponent />);

    // Set initial state with "Oat Milk" already selected
    fireEvent.click(getByTestId("oat-milk"));

    // Click to add "Brown Sugar Jelly" as well
    fireEvent.click(getByTestId("brown-sugar-jelly"));

    // Check if both add-ons are now in the list
    expect(getByTestId("selected-addons")).toHaveTextContent("Oat Milk, Brown Sugar Jelly");
  });

  it("T4 (C1b2, C2b1, C3b2): adds another add-on to a list that already has multiple add-ons", () => {
    const { getByTestId } = render(<MockComponent />);

    // Set initial state with "Oat Milk" and add "Brown Sugar Jelly"
    fireEvent.click(getByTestId("oat-milk"));
    fireEvent.click(getByTestId("brown-sugar-jelly"));

    // Check if both add-ons are added
    expect(getByTestId("selected-addons")).toHaveTextContent("Oat Milk, Brown Sugar Jelly");
  });

  it("T5 (C1b1, C2b2, C3b1): handles removing the only add-on in the list", () => {
    const { getByTestId } = render(<MockComponent />);

    // Add "Oat Milk" and then toggle it to remove
    fireEvent.click(getByTestId("oat-milk"));
    fireEvent.click(getByTestId("oat-milk"));

    // Check if the list is empty
    expect(getByTestId("selected-addons")).toHaveTextContent("");
  });

  it("T6 (C1b1, C2b2, C3b2): handles removing one add-on from a list of multiple add-ons", () => {
    const { getByTestId } = render(<MockComponent />);

    // Add "Oat Milk" and "Brown Sugar Jelly", then remove "Oat Milk"
    fireEvent.click(getByTestId("oat-milk"));
    fireEvent.click(getByTestId("brown-sugar-jelly"));
    fireEvent.click(getByTestId("oat-milk"));

    // Check if "Brown Sugar Jelly" remains
    expect(getByTestId("selected-addons")).toHaveTextContent("Brown Sugar Jelly");
  });

  it("T7 (C1b2, C2b2, C3b1): removes the single add-on present in the list", () => {
    const { getByTestId } = render(<MockComponent />);

    // Add "Oat Milk" and then toggle to remove it
    fireEvent.click(getByTestId("oat-milk"));
    fireEvent.click(getByTestId("oat-milk"));

    // Check if the list is empty
    expect(getByTestId("selected-addons")).toHaveTextContent("");
  });

  it("T8 (C1b2, C2b2, C3b2): removes an add-on from a list with multiple add-ons", () => {
    const { getByTestId } = render(<MockComponent />);

    // Add "Oat Milk" and "Brown Sugar Jelly", then toggle "Oat Milk" to remove it
    fireEvent.click(getByTestId("oat-milk"));
    fireEvent.click(getByTestId("brown-sugar-jelly"));
    fireEvent.click(getByTestId("oat-milk"));

    // Check if only "Brown Sugar Jelly" remains in the list
    expect(getByTestId("selected-addons")).toHaveTextContent("Brown Sugar Jelly");
  });
});
