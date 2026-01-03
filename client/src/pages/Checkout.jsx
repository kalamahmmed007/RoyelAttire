import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
    });

    const subtotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const placeOrder = () => {
        // Normally send to backend, here just simulate
        dispatch(clearCart());
        navigate("/order-success", { state: { form, subtotal } });
    };

    if (items.length === 0)
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="mb-4 text-2xl font-semibold">Your cart is empty</h2>
            </div>
        );

    return (
        <div className="container mx-auto py-10">
            <h2 className="mb-6 text-2xl font-bold">Checkout</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                    />
                    <textarea
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                    />
                    <button
                        onClick={placeOrder}
                        className="w-full rounded bg-black py-2 text-white"
                    >
                        Place Order
                    </button>
                </div>

                <div className="space-y-2 rounded border p-4 shadow">
                    <h3 className="text-lg font-semibold">Order Summary</h3>
                    {items.map((item) => (
                        <div key={item.product._id} className="flex justify-between">
                            <span>{item.product.name} x {item.quantity}</span>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
