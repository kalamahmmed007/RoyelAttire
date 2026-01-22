import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LatestProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const carouselRef = useRef(null);

  // Dummy products - pinned
  useEffect(() => {
    const dummyProducts = [
      { id: 1, name: "Smartphone X", price: 499, category: "Electronics", image: "https://via.placeholder.com/200x200?text=Smartphone+X" },
      { id: 2, name: "Running Shoes", price: 89, category: "Fashion", image: "https://via.placeholder.com/200x200?text=Running+Shoes" },
      { id: 3, name: "Leather Jacket", price: 129, category: "Fashion", image: "https://via.placeholder.com/200x200?text=Leather+Jacket" },
      { id: 4, name: "Wireless Headphones", price: 199, category: "Electronics", image: "https://via.placeholder.com/200x200?text=Headphones" },
      { id: 5, name: "Coffee Maker", price: 59, category: "Home & Living", image: "https://via.placeholder.com/200x200?text=Coffee+Maker" },
      { id: 6, name: "Yoga Mat", price: 29, category: "Sports", image: "https://via.placeholder.com/200x200?text=Yoga+Mat" },
      { id: 7, name: "Sunglasses", price: 49, category: "Fashion", image: "https://via.placeholder.com/200x200?text=Sunglasses" },
      { id: 8, name: "Smart Watch", price: 149, category: "Electronics", image: "https://via.placeholder.com/200x200?text=Smart+Watch" },
      { id: 9, name: "Blender", price: 39, category: "Home & Living", image: "https://via.placeholder.com/200x200?text=Blender" },
      { id: 10, name: "Basketball", price: 25, category: "Sports", image: "https://via.placeholder.com/200x200?text=Basketball" },
    ];
    setProducts(dummyProducts);
  }, []);

  // Auto-slide
  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const slideWidth = 220; // width + gap of one product card
    const interval = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        scrollAmount = 0;
      } else {
        scrollAmount += slideWidth;
        scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, 2500); // every 2.5 sec

    return () => clearInterval(interval);
  }, [products]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <div className="my-8">
      <div className="px-4 overflow-x-auto md:px-0" ref={carouselRef}>
        <div className="flex gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[200px] flex-shrink-0 cursor-pointer rounded-lg border bg-white p-4 shadow hover:shadow-lg transition"
              onClick={() => handleCategoryClick(product.category)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-40 rounded"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-700">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestProducts;
