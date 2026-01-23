import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { addToWishlist } from "../../redux/slices/wishlistSlice";
import toast from "react-hot-toast";
import { ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";

// 🔥 Dummy Products (apatoto)
const dummyProducts = [
  {
    _id: "1",
    name: "Premium T-Shirt",
    price: 1200,
    image: "https://via.placeholder.com/300x300?text=T-Shirt",
    stock: 10,
  },
  {
    _id: "2",
    name: "Stylish Hoodie",
    price: 2200,
    image: "https://via.placeholder.com/300x300?text=Hoodie",
    stock: 5,
  },
  {
    _id: "3",
    name: "Denim Jacket",
    price: 3500,
    image: "https://via.placeholder.com/300x300?text=Jacket",
    stock: 8,
  },
  {
    _id: "4",
    name: "Casual Sneakers",
    price: 4200,
    image: "https://via.placeholder.com/300x300?text=Sneakers",
    stock: 15,
  },
];

const LatestProduct = () => {
  const dispatch = useDispatch();

  // 🛒 Add to cart
  const handleAddToCart = (product) => {
    dispatch(addItemToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => toast.success("Added to cart 🛒"))
      .catch(() => toast.error("Add to cart failed"));
  };

  // ❤️ Add to wishlist
  const handleWishlist = (product) => {
    dispatch(addToWishlist(product));
    toast.success("Added to wishlist ❤️");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        🔥 Latest Products
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {dummyProducts.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl border bg-white p-4 shadow-sm transition"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full rounded-lg object-cover"
              />

              {/* Wishlist */}
              <button
                onClick={() => handleWishlist(product)}
                className="absolute right-2 top-2 rounded-full bg-white p-2 shadow hover:bg-gray-100"
              >
                <Heart size={18} className="text-red-500" />
              </button>
            </div>

            {/* Info */}
            <div className="mt-4">
              <h3 className="line-clamp-1 font-semibold text-gray-800">
                {product.name}
              </h3>

              <p className="mt-1 text-lg font-bold text-green-600">
                ৳ {product.price}
              </p>

              {product.stock === 0 && (
                <p className="mt-1 text-sm text-red-500">Out of stock</p>
              )}
            </div>

            {/* Add to cart */}
            <button
              disabled={product.stock === 0}
              onClick={() => handleAddToCart(product)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestProduct;
