import { useEffect, useState } from "react";
import ProductList from "../components/product/ProductList";
import Hero from "../components/hero/Hero";
import LatestProducts from "../components/product/Latestproduct"; // New
import axios from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products?featured=true");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container py-8 mx-auto">
      {/* Hero Banner */}
      <Hero />

      {/* Featured Products */}
      <section className="mt-8">
        <h1 className="mb-6 text-3xl font-bold text-center">Featured Products</h1>
        <ProductList products={products} />
      </section>

      {/* Latest Products Carousel */}
      <section className="mt-8">
        <h1 className="mb-6 text-3xl font-bold text-center">Latest Products</h1>
        <LatestProducts />
      </section>
    </div>
  );
};

export default Home;
