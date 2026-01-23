import { useSelector, useDispatch } from "react-redux";
import {
    fetchCart,
    addItemToCart,
    removeItemFromCart,
    clearCart
} from "../redux/slices/cartSlice"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Cart = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    const increment = (item) => {
        dispatch(
            updateQuantity({
                productId: item.product._id,
                quantity: item.quantity + 1,
            })
        );
    };

    const decrement = (item) => {
        if (item.quantity <= 1) return;
        dispatch(
            updateQuantity({
                productId: item.product._id,
                quantity: item.quantity - 1,
            })
        );
    };

    const remove = (productId) => {
        dispatch(removeItemFromCart(productId));
    };

    const subtotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="mb-4 text-2xl font-semibold">Your cart is empty</h2>
                <Link
                    to="/products"
                    className="inline-block rounded bg-black px-6 py-2 text-white"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="mb-6 text-2xl font-bold">Shopping Cart</h2>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Cart Items */}
                <div className="space-y-4 md:col-span-2">
                    {items.map((item) => (
                        <div
                            key={item.product._id}
                            className="flex gap-4 rounded border p-4"
                        >
                            <img
                                src={item.product.images?.[0]}
                                alt={item.product.name}
                                className="h-24 w-24 rounded object-cover"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold">{item.product.name}</h3>
                                <p className="text-gray-600">${item.product.price}</p>

                                <div className="mt-3 flex items-center gap-3">
                                    <button
                                        onClick={() => decrement(item)}
                                        className="h-8 w-8 rounded bg-gray-200"
                                    >
                                        −
                                    </button>
                                    <span className="font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => increment(item)}
                                        className="h-8 w-8 rounded bg-gray-200"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => remove(item.product._id)}
                                    className="mt-2 text-sm text-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="h-fit rounded border p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>

                    <div className="mb-2 flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="mb-2 flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <Link
                        to="/checkout"
                        className="mt-6 block w-full rounded bg-black py-2 text-center text-white hover:bg-gray-900"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
