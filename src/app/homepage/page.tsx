"use client";

import { useState } from "react";
import Card from "../components/ProductCard/Card";
import SearchBar from "../components/SearchBar/SearchBar";
import FilterBar from "../components/FilterBar/FilterBar";
import Slideshow from "../components/Slideshow/Slideshow";
import NavBar from "../components/Navbar/Nav";
import "./homepage.css";
import {
  FaCoffee,
  FaBreadSlice,
} from "react-icons/fa"; // Import icons
import { CiCircleChevDown, CiCircleChevUp, CiLemon } from "react-icons/ci";
import { RiDrinks2Fill, RiDrinksLine } from "react-icons/ri";
import PaginationButton from "../components/Pagination/Pagination";

interface Product {
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

const products: Product[] = [
  {
    id: 1,
    name: "Espresso",
    description:
      "Espresso is a rich, full-flavored coffee shot made by forcing hot water under pressure through finely-ground coffee beans. It is known for its bold taste and thicker consistency compared to other coffee brewing methods. Espresso serves as the base for many other drinks like lattes and cappuccinos, making it a versatile favorite for coffee enthusiasts.",
    hotPrice: "50",
    coldPrice: "-",
    category: "Coffee",
    TypeOfDrinks: "Hot",
    isRecommended: false,
    image: "/images/drinks/espresso.png",
  },
  {
    id: 2,
    name: "Americano",
    description:
      "An Americano is made by diluting an espresso shot with hot water, giving it a similar strength to drip coffee but with a different flavor profile. It is known for its smooth texture and rich espresso taste, which is slightly less intense when diluted. This makes the Americano a great option for those who prefer a milder, less concentrated coffee flavor while still enjoying the richness of espresso.",
    hotPrice: "55",
    coldPrice: "60",
    category: "Coffee",
    TypeOfDrinks: "Hot/Cold",
    isRecommended: false,
    image: "/images/drinks/americano.png",
  },
  {
    id: 3,
    name: "Cappuccino",
    description:
      "Cappuccino is a popular coffee drink that combines equal parts of espresso, steamed milk, and milk foam. Known for its frothy top and balanced taste, the cappuccino offers a perfect harmony of bold coffee flavors and creamy milk. It’s typically enjoyed in smaller servings than lattes, making it a favorite for those who appreciate a strong coffee-to-milk ratio.",
    hotPrice: "60",
    coldPrice: "65",
    category: "Coffee",
    TypeOfDrinks: "Hot/Cold",
    isRecommended: false,
    image: "/images/drinks/capuccino.png",
  },
  {
    id: 4,
    name: "Es-Yen (Thai Style)",
    description:
      "Es-Yen is a traditional Thai-style iced coffee, often sweetened with condensed milk and sugar. This refreshing beverage combines the bold flavor of strong brewed coffee with the creaminess and sweetness of condensed milk, making it a popular choice for hot, tropical climates. Its unique preparation method gives it a distinct flavor profile that stands out from other types of iced coffee.",
    hotPrice: "-",
    coldPrice: "65",
    category: "Coffee",
    TypeOfDrinks: "Cold",
    isRecommended: false,
    image: "/images/drinks/Es-Yen Thai Style.png",
  },
  {
    id: 5,
    name: "Latte",
    description:
      "A latte is a creamy coffee drink made with a shot of espresso and steamed milk. It is often topped with a small layer of milk foam, and it’s known for its mild, comforting flavor. Lattes are highly customizable, allowing drinkers to add flavored syrups, spices, or even alternative milks to create the perfect personalized beverage. This drink is ideal for those who prefer a smooth, milky coffee with less intensity than a cappuccino.",
    hotPrice: "60",
    coldPrice: "65",
    category: "Coffee",
    TypeOfDrinks: "Hot/Cold",
    isRecommended: false,
    image: "/images/drinks/latte.png",
  },
  {
    id: 6,
    name: "Mocha",
    description:
      "Mocha is a delicious blend of espresso, steamed milk, and chocolate syrup, topped with whipped cream for an indulgent treat. It’s a popular choice for those who love the combination of rich coffee and sweet chocolate flavors. The mocha offers a perfect balance between coffee bitterness and chocolate sweetness, making it an ideal dessert-like beverage.",
    hotPrice: "65",
    coldPrice: "70",
    category: "Coffee",
    TypeOfDrinks: "Hot/Cold",
    isRecommended: false,
    image: "/images/drinks/mocha.png",
  },
  {
    id: 7,
    name: "Salted Caramel Macchiato",
    description:
      "Salted Caramel Macchiato is a delightful combination of espresso, steamed milk, and vanilla syrup, finished with a rich caramel drizzle and a sprinkle of sea salt. This drink offers a complex flavor profile where the bitterness of espresso is complemented by the sweetness of caramel and the slight tang of salt, making for a truly unique and satisfying coffee experience.",
    hotPrice: "65",
    coldPrice: "70",
    category: "Coffee",
    TypeOfDrinks: "Hot/Cold",
    isRecommended: true,
    image: "/images/drinks/salted caramel macchiato.png",
  },
  {
    id: 8,
    name: "Coconut Flower Americano",
    description:
      "The Coconut Flower Americano is a refreshing take on the classic Americano, infused with the subtle sweetness of coconut flower nectar. This drink offers the rich espresso flavors of a traditional Americano but with a light, tropical twist that makes it perfect for warm weather. The hint of coconut adds an exotic touch without overpowering the boldness of the coffee.",
    hotPrice: "-",
    coldPrice: "70",
    category: "Coffee",
    TypeOfDrinks: "Cold",
    isRecommended: false,
    image: "/images/drinks/coconut flower macchiato.png",
  },
  {
    id: 9,
    name: "Orange Coffee",
    description:
      "Orange Coffee is a bold and refreshing coffee drink that combines the robust flavor of espresso with the bright citrus notes of fresh orange juice. The unexpected blend of coffee and orange creates a vibrant and zesty drink that’s perfect for those looking for a refreshing and energizing option. The acidity of the orange perfectly balances the bitterness of the espresso, making it a must-try for adventurous coffee drinkers.",
    hotPrice: "-",
    coldPrice: "70",
    category: "Coffee",
    TypeOfDrinks: "Cold",
    isRecommended: true,
    image: "/images/drinks/orange coffee.png",
  },
  {
    id: 10,
    name: "Soft Bread", // Name should be replaced with actual product name
    description: "A delicious assortment of baked goods, perfect for a morning snack or afternoon treat.",
    hotPrice: "-",
    coldPrice: "70",
    category: "Bakery",
    TypeOfDrinks: "-",
    isRecommended: false,
    image: "/images/drinks/23.png",
  },
  {
    id: 11,
    name: "Cookies", // Name should be replaced with actual product name
    description: "Freshly baked cookies with a rich, buttery flavor and a soft, chewy texture.",
    hotPrice: "-",
    coldPrice: "70",
    category: "Bakery",
    TypeOfDrinks: "-",
    isRecommended: false,
    image: "/images/drinks/24.png",
  },
  {
    id: 12,
    name: "Bread", // Name should be replaced with actual product name
    description: "A soft and fluffy slice of bread, perfect for sandwiches or enjoying with butter.",
    hotPrice: "-",
    coldPrice: "35",
    category: "Bakery",
    TypeOfDrinks: "-",
    isRecommended: false,
    image: "/images/drinks/25.png",
  },
  {
    id: 13,
    name: "Caramel Fresh Milk",
    description: "A smooth and creamy milk drink with a rich caramel flavor, perfect for a sweet indulgence.",
    hotPrice: "-",
    coldPrice: "65",
    category: "Non-Coffee",
    TypeOfDrinks: "Cold",
    isRecommended: false,
    image: "/images/drinks/caramel fresh milk.png",
  },
  {
    id: 14,
    name: "Cocoa",
    description: "A rich and creamy chocolate drink made with high-quality cocoa powder and steamed milk.",
    hotPrice: "60",
    coldPrice: "65",
    category: "Non-Coffee",
    TypeOfDrinks: "Hot/Cold",
    isRecommended: false,
    image: "/images/drinks/cocoa.png",
  },
  {
    id: 15,
    name: "Coconut Flower Matcha",
    description: "A unique blend of matcha tea with the light sweetness of coconut flower nectar.",
    hotPrice: "-",
    coldPrice: "70",
    category: "Matcha",
    TypeOfDrinks: "Cold",
    isRecommended: true,
    image: "/images/drinks/coconut flower matcha.png",
  },
  {
    id: 16,
    name: "Coke",
    description: "A refreshing carbonated soft drink with a crisp and classic cola flavor.",
    hotPrice: "-",
    coldPrice: "40",
    category: "Non-Coffee",
    TypeOfDrinks: "Cold",
    isRecommended: false,
    image: "/images/drinks/coke.png",
  },
  {
    id: 17,
    name: "Fruit Sunshine Tea",
    description: "A light and refreshing tea infused with tropical fruit flavors, perfect for a sunny day.",
    hotPrice: "-",
    coldPrice: "65",
    category: "Refreshment",
    TypeOfDrinks: "Cold",
    isRecommended: true,
    image: "/images/drinks/fruit sunshine tea.png",
  },
  {
    id: 18,
    name: "Lemon Yuzu Soda",
    description: "A sparkling lemon soda with the unique citrus flavor of yuzu, offering a refreshing and tangy taste.",
    hotPrice: "-",
    coldPrice: "70",
    category: "Refreshment",
    TypeOfDrinks: "Cold",
    isRecommended: true,
    image: "/images/drinks/lemon yuzu soda.png",
  },
  {
    id: 19,
    name: "Matcha Latte",
    description: "A creamy blend of matcha green tea and steamed milk, offering a perfect balance of sweetness and matcha flavor.",
    hotPrice: "65",
    coldPrice: "70",
    category: "Matcha",
    TypeOfDrinks: "Hot/Cold",
    isRecommended: false,
    image: "/images/drinks/matcha latte.png",
  },
  {
    id: 20,
    name: "Orange Juice",
    description: "Freshly squeezed orange juice, bursting with citrusy goodness, perfect for a refreshing pick-me-up.",
    hotPrice: "-",
    coldPrice: "55",
    category: "Refreshment",
    TypeOfDrinks: "Cold",
    isRecommended: false,
    image: "/images/drinks/orange juice.png",
  },
  {
    id: 21,
    name: "Orange Matcha",
    description: "An innovative combination of earthy matcha and bright orange flavors, creating a refreshing and energizing drink.",
    hotPrice: "-",
    coldPrice: "75",
    category: "Matcha",
    TypeOfDrinks: "Cold",
    isRecommended: false,
    image: "/images/drinks/orange matcha.png",
  },
  {
    id: 22,
    name: "Sandwich",
    description: "A classic sandwich filled with fresh ingredients, perfect for a quick and satisfying meal.",
    hotPrice: "-",
    coldPrice: "35",
    category: "Bakery",
    TypeOfDrinks: "-",
    isRecommended: false,
    image: "/images/drinks/sandwich.png",
  },
  {
    id: 23,
    name: "Thai Milk Tea",
    description: "A rich and creamy Thai milk tea made with strong brewed tea and sweetened condensed milk.",
    hotPrice: "60",
    coldPrice: "65",
    category: "Non-Coffee",
    TypeOfDrinks: "Hot/Cold",
    isRecommended: false,
    image: "/images/drinks/thai milk tea.png",
  },
  {
    id: 24,
    name: "Twist Matcha Latte",
    description: "A twist on the traditional matcha latte, offering a unique blend of flavors for an exciting matcha experience.",
    hotPrice: "-",
    coldPrice: "70",
    category: "Matcha",
    TypeOfDrinks: "Cold",
    isRecommended: true,
    image: "/images/drinks/twist matcha latte.png",
  },
  {
    id: 25,
    name: "Water",
    description: "A refreshing bottle of purified water to quench your thirst and keep you hydrated.",
    hotPrice: "-",
    coldPrice: "20",
    category: "Non-Coffee",
    TypeOfDrinks: "Cold",
    isRecommended: false,
    image: "/images/drinks/water.png",
  }
];

const filters = [
  { label: "All" },
  { label: "Coffee", icon: <FaCoffee /> },
  { label: "Matcha", icon: <RiDrinksLine /> },
  { label: "Non-Coffee", icon: <RiDrinks2Fill /> },
  { label: "Bakery", icon: <FaBreadSlice /> },
  { label: "Refreshment", icon: <CiLemon /> },
  { label: "Price Down ", icon: <CiCircleChevDown /> },
  { label: "Price Up", icon: <CiCircleChevUp /> },
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Function to apply filters and sorting
  const applyFilters = (filter: string) => {
    let updatedProducts = [...products]; // Make a copy of products

    // Handle category filters
    if (filter !== "All" && filter !== "Price Up" && filter !== "Price Down") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === filter
      );
    }

    // Handle price sorting (ascending or descending)
    if (filter === "Price Up") {
      updatedProducts.sort((a, b) => {
        const priceA =
          a.coldPrice !== "-" ? Number(a.coldPrice) : Number(a.hotPrice);
        const priceB =
          b.coldPrice !== "-" ? Number(b.coldPrice) : Number(b.hotPrice);
        return priceA - priceB; // Ascending order
      });
    }

    if (filter === "Price Down") {
      updatedProducts.sort((a, b) => {
        const priceA =
          a.coldPrice !== "-" ? Number(a.coldPrice) : Number(a.hotPrice);
        const priceB =
          b.coldPrice !== "-" ? Number(b.coldPrice) : Number(b.hotPrice);
        return priceB - priceA; // Descending order
      });
    }

    // Update the state with filtered/sorted products
    setFilteredProducts(updatedProducts);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    applyFilters(filter);
    console.log(`Selected filter: ${filter}`);
  };

  return (
    <main className="pt-20">
      <header>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Montserrat:wght@400;700&display=swap"
        />
      </header>
      <NavBar />
      <div className="search-container">
        <SearchBar
          onSearch={function (term: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className="filterbar-container">
        <FilterBar
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterSelect={handleFilterSelect}
        />
      </div>
      {selectedFilter === "All" && (
        <div>
          <Slideshow />
        </div>
      )}
      <div className="title">
        <h1> RECOMMENDED</h1>
      </div>
      <div className="recommeded-container">
        {products
          .filter((product) => product.isRecommended)
          .map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              hotPrice={product.hotPrice}
              coldPrice={product.coldPrice}
              category={product.category}
              TypeOfDrinks={product.TypeOfDrinks}
              isRecommended={product.isRecommended}
              image={product.image}
            />
          ))}
      </div>
      <div className="title">
        <h1> EXPLORE OUR MENU </h1>
      </div>
      <div className="card-container">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            hotPrice={product.hotPrice}
            coldPrice={product.coldPrice}
            category={product.category}
            TypeOfDrinks={product.TypeOfDrinks}
            isRecommended={product.isRecommended}
            image={product.image}
          />
        ))}
      </div>
      <PaginationButton />
    </main>
  );
}
