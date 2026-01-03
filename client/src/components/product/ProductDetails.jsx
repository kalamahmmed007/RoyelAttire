import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/api";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/slices/cartSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/products/${id}`);
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p className="py-10 text-center">Loading...</p>;

    return (
        <div className="container mx-auto flex flex-col gap-8 py-8 md:flex-row">
            <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full rounded object-cover md:w-1/2"
            />
            <div className="flex-1">
                <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>
                <p className="mb-4 text-gray-700">{product.description}</p>
                <p className="mb-4 text-xl font-semibold">${product.price}</p>
                <button
                    onClick={() =>
                        dispatch(addItemToCart({ productId: product._id, quantity: 1 }))
                    }
                    className="rounded bg-black px-4 py-2 text-white"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
