import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const subtotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
            <div className="relative flex h-full w-full max-w-md flex-col bg-white p-6 shadow-lg">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-black">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="text-2xl font-bold text-black hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 space-y-4 overflow-y-auto">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty</p>
                    ) : (
                        items.map((item) => <CartItem key={item.product._id} item={item} />)
                    )}
                </div>

                {/* Subtotal & Actions */}
                {items.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                        <p className="mb-2 text-lg font-semibold text-black">
                            Subtotal: <span className="text-red-600">${subtotal.toFixed(2)}</span>
                        </p>

                        <div className="flex flex-col gap-2">
                            <Link
                                to="/checkout"
                                onClick={onClose}
                                className="w-full rounded bg-red-600 px-4 py-2 text-center font-semibold text-white transition hover:bg-red-700"
                            >
                                Proceed to Checkout
                            </Link>

                            <button
                                onClick={() => dispatch(clearCart())}
                                className="w-full rounded border border-red-600 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
