import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
    // ensure products is always an array
    if (!Array.isArray(products)) products = [];

    if (products.length === 0) {
        return <p className="py-10 text-center">No products found.</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <div key={product._id} className="rounded border p-4 shadow hover:shadow-md">
                    <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="mb-2 h-48 w-full rounded object-cover"
                    />
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-700">${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;

