import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addItemToCart } from "../redux/slices/cartSlice";
import ProductFilter from "../components/product/ProductFilter";

const Products = () => {
    const dispatch = useDispatch();
    const { list: products, loading } = useSelector((state) => state.products);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("search");

    // Fetch products on mount or when search query changes
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch, query]);

    // Fetch categories once
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
                const data = await res.json();
                setCategories(Array.isArray(data) ? data : data.categories || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Apply search filtering locally
    useEffect(() => {
        if (!products || !Array.isArray(products)) return setFilteredProducts([]);
        if (query) {
            setFilteredProducts(
                products.filter((p) =>
                    p.name.toLowerCase().includes(query.toLowerCase())
                )
            );
        } else {
            setFilteredProducts(products);
        }
    }, [products, query]);

    // Filter by category
    const handleFilter = async (category) => {
        if (!category) return setFilteredProducts(products);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/products/categories/${category}`
            );
            const data = await res.json();
            setFilteredProducts(Array.isArray(data) ? data : data.products || []);
        } catch (err) {
            console.error("Error filtering products:", err);
        }
    };

    if (loading) return <p className="py-10 text-center">Loading products...</p>;
    if (!filteredProducts || filteredProducts.length === 0)
        return <p className="py-10 text-center">No products found.</p>;

    return (
        <div className="container mx-auto py-8">
            <ProductFilter categories={categories} onFilter={handleFilter} />

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                    <div
                        key={product._id}
                        className="rounded border p-4 shadow transition hover:shadow-lg"
                    >
                        <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="mb-2 h-40 w-full rounded object-cover"
                        />
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="mb-2 text-gray-700">${product.price}</p>
                        <button
                            className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                            onClick={() =>
                                dispatch(addItemToCart({ productId: product._id, quantity: 1 }))
                            }
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
