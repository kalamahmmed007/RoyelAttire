import { useEffect, useState } from "react";
import ProductList from "../components/product/ProductList";
import Hero from "../components/hero/Hero";
import axios from "../services/api";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get("/products?featured=true");
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <Hero />
            <h1 className="mb-6 text-center text-3xl font-bold">Featured Products</h1>
            <ProductList products={products} />
        </div>
    );
};

export default Home;
