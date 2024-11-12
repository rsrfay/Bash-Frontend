import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Mock next/navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe("SearchBar Component", () => {
  const mockOnSearch = jest.fn();
  const replaceMock = jest.fn();
  const mockSearchParams = {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    toString: jest.fn(() => "page=1&name=Americano"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (usePathname as jest.Mock).mockReturnValue("/"); // Mock pathname to root

    jest.useFakeTimers(); // Enable fake timers for debounce handling
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // T1 (C1b1, C2b1)
  // handleSearch("Americano")
  // Show the matched results.
  it("test Americano search input", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search a product...");
    // Simulate typing "Americano"
    userEvent.type(inputElement, "Americano");
    // Advance timers to trigger the debounced function
    jest.advanceTimersByTime(300);
    // Log the calls for debugging purposes
    // Check if replace was called
    expect(replaceMock).toHaveBeenCalled();

    console.log("Replace mock calls:", replaceMock.mock.calls);
    // Check replace call for expected URL if replaceMock was called
    if (replaceMock.mock.calls.length > 0) {
      expect(replaceMock).toHaveBeenCalledWith(expect.stringContaining("page=1&name=Americano"));
    }

    // Verify onSearch is called with "Americano"
    expect(mockOnSearch).toHaveBeenCalledWith("Americano");
  });
});