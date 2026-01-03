import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="rounded border p-4 transition hover:shadow-lg">
            <Link to={`/products/${product._id}`}>
                <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="mb-4 h-48 w-full rounded object-cover"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
            </Link>
        </div>
    );
};

export default ProductCard;
