import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
    const location = useLocation();
    const { form, subtotal } = location.state || {};

    if (!form) return <p>Invalid order.</p>;

    return (
        <div className="container mx-auto py-20 text-center">
            <h2 className="mb-4 text-3xl font-bold">🎉 Order Placed Successfully!</h2>
            <p className="mb-2">Thank you, {form.name}</p>
            <p className="mb-6">Total: ${subtotal.toFixed(2)}</p>
            <Link
                to="/products"
                className="rounded bg-black px-6 py-2 text-white"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default OrderSuccess;
