import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.cart);

    const totalQty = items.reduce((acc, i) => acc + i.quantity, 0);
    const totalPrice = items.reduce(
        (acc, i) => acc + i.quantity * i.product.price,
        0
    );

    return (
        <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md sm:ml-auto">
            <h2 className="mb-4 text-xl font-bold text-black">Order Summary</h2>

            <div className="mb-4 space-y-1 text-gray-700">
                <p className="flex justify-between">
                    <span>Items:</span>
                    <span>{totalQty}</span>
                </p>
                <p className="flex justify-between font-semibold text-red-600">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </p>
            </div>

            <button
                onClick={() => navigate("/checkout")}
                disabled={items.length === 0}
                className="w-full rounded bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CartSummary;
