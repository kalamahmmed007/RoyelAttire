import { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const { data } = await axios.get("/orders");
            setOrders(data);
        };
        fetchOrders();
    }, []);

    if (orders.length === 0) return <p className="py-10 text-center">No orders found.</p>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="mb-6 text-2xl font-bold">Your Orders</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="flex items-center justify-between rounded border p-4">
                        <div>
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                        </div>
                        <Link to={`/orders/${order._id}`} className="text-blue-600 underline">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
