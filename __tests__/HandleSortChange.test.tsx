import { handleSortChange } from "@/lib/utilsSort";

interface Product {
  id: number | string; // Use string if the Bakery_ID is alphanumeric
  name: string;
  description: string;
  hotPrice: string | number;
  coldPrice: string | number;
  category: string;
  TypeOfDrinks: string;
  isRecommended: boolean;
  image: string;
  Tag: string[]; // Add this line for tags
}

describe("handleSortChange Function", () => {
  test("sorts empty products by price in ascending order", () => {
    const products: Product[] = [];
    const sortedProducts = handleSortChange(products, "Price Low to High");
    console.log(sortedProducts);
    expect(sortedProducts).toEqual([]); 
  });

  test("sorts empty products by price in decending order", () => {
    const products: Product[] = [];
    const sortedProducts = handleSortChange(products, "Price High to Low");
    console.log(sortedProducts);
    expect(sortedProducts).toEqual([]); 
  });

  test("sorts empty products by price in invalid order", () => {
    const products: Product[] = [];
    const sortedProducts = handleSortChange(products, "Invalid value");
    console.log(sortedProducts);
    expect(sortedProducts).toEqual([]); 
  });

  test("sorts products by price in ascending order", () => {
    const products: Product[] = [
      {
        id: 1,
        name: "Dirty",
        description:
          "A rich espresso shot served over cold milk, resulting in a bold flavor contrast.",
        hotPrice: "85",
        coldPrice: "90",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: true,
        image: "latte.png",
        Tag: ["Coffee", "Recommend"],
      }
    ];
    const sortedProducts = handleSortChange(products, "Price Low to High");
    console.log(sortedProducts);
    expect(sortedProducts).toEqual(products); 
  });

  test("sorts single products by price in decending order", () => {
    const products: Product[] = [
      {
        id: 1,
        name: "Dirty",
        description:
          "A rich espresso shot served over cold milk, resulting in a bold flavor contrast.",
        hotPrice: "85",
        coldPrice: "90",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: true,
        image: "latte.png",
        Tag: ["Coffee", "Recommend"],
      }
    ];
    const sortedProducts = handleSortChange(products, "Price High to Low");
    console.log(sortedProducts);
    expect(sortedProducts).toEqual(products); 
  });

  test("sorts products by price in invalid order", () => {
    const products: Product[] = [
      {
        id: 1,
        name: "Dirty",
        description:
          "A rich espresso shot served over cold milk, resulting in a bold flavor contrast.",
        hotPrice: "85",
        coldPrice: "90",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: true,
        image: "latte.png",
        Tag: ["Coffee", "Recommend"],
      }
    ];
    const sortedProducts = handleSortChange(products, "Invalid value");
    console.log(sortedProducts);
    expect(sortedProducts).toEqual(products); 
  });

  test("sorts multiple products by price in ascending order", () => {
    const products: Product[] = [
      {
        id: 1,
        name: "Dirty",
        description:
          "A rich espresso shot served over cold milk, resulting in a bold flavor contrast.",
        hotPrice: "85",
        coldPrice: "90",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: true,
        image: "latte.png",
        Tag: ["Coffee", "Recommend"],
      },
      {
        id: 2,
        name: "Americano",
        description:
          "An Americano is made by diluting an espresso shot with hot water for a smooth, robust coffee.",
        hotPrice: "55",
        coldPrice: "60",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: false,
        image: "americano.png",
        Tag: ["Coffee"],
      },
      {
        id: 3,
        name: "Latte",
        description:
          "A smooth blend of espresso and steamed milk with a creamy finish.",
        hotPrice: "60",
        coldPrice: "65",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: false,
        image: "latte.png",
        Tag: ["Coffee", "Milk"],
      },
    ];
    const sortedProducts = handleSortChange(products, "Price Low to High");
    console.log(sortedProducts);
    expect(sortedProducts[0].id).toBe(2); // Expected to be the cheapest (Americano)
    expect(sortedProducts[1].id).toBe(3); // Expected to be the next cheapest (Latte)
    expect(sortedProducts[2].id).toBe(1); // Expected to be the most expensive (Dirty)
  });

  test("sorts products by price in decending order", () => {
    const products: Product[] = [
      {
        id: 1,
        name: "Dirty",
        description:
          "A rich espresso shot served over cold milk, resulting in a bold flavor contrast.",
        hotPrice: "85",
        coldPrice: "90",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: true,
        image: "latte.png",
        Tag: ["Coffee", "Recommend"],
      },
      {
        id: 2,
        name: "Americano",
        description:
          "An Americano is made by diluting an espresso shot with hot water for a smooth, robust coffee.",
        hotPrice: "55",
        coldPrice: "60",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: false,
        image: "americano.png",
        Tag: ["Coffee"],
      },
      {
        id: 3,
        name: "Latte",
        description:
          "A smooth blend of espresso and steamed milk with a creamy finish.",
        hotPrice: "60",
        coldPrice: "65",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: false,
        image: "latte.png",
        Tag: ["Coffee", "Milk"],
      },
    ];
    const sortedProducts = handleSortChange(products, "Price High to Low");
    console.log(sortedProducts);
    expect(sortedProducts[0].id).toBe(1); // Expected to be the cheapest (Americano)
    expect(sortedProducts[1].id).toBe(3); // Expected to be the next cheapest (Latte)
    expect(sortedProducts[2].id).toBe(2); // Expected to be the most expensive (Dirty)
  });

  test("sorts products by price in invalid order", () => {
    const products: Product[] = [
      {
        id: 1,
        name: "Dirty",
        description:
          "A rich espresso shot served over cold milk, resulting in a bold flavor contrast.",
        hotPrice: "85",
        coldPrice: "90",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: true,
        image: "latte.png",
        Tag: ["Coffee", "Recommend"],
      },
      {
        id: 2,
        name: "Americano",
        description:
          "An Americano is made by diluting an espresso shot with hot water for a smooth, robust coffee.",
        hotPrice: "55",
        coldPrice: "60",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: false,
        image: "americano.png",
        Tag: ["Coffee"],
      },
      {
        id: 3,
        name: "Latte",
        description:
          "A smooth blend of espresso and steamed milk with a creamy finish.",
        hotPrice: "60",
        coldPrice: "65",
        category: "Drink",
        TypeOfDrinks: "Hot/Cold",
        isRecommended: false,
        image: "latte.png",
        Tag: ["Coffee", "Milk"],
      },
    ];
    const sortedProducts = handleSortChange(products, "Invalid value");
    console.log(sortedProducts);
    expect(sortedProducts).toEqual(products); 
  });
});