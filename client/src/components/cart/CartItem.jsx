import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleQtyChange = (e) => {
        dispatch(
            updateQuantity({
                productId: item.product._id,
                quantity: Number(e.target.value),
            })
        );
    };

    return (
        <div className="flex gap-4 border-b py-4 items-center">
            <img
                src={item.product.images?.[0]}
                alt={item.product.name}
                className="h-20 w-20 rounded object-cover"
            />

            <div className="flex-1">
                <h3 className="font-semibold text-black">{item.product.name}</h3>
                <p className="text-sm text-gray-500">${item.product.price}</p>

                <select
                    value={item.quantity}
                    onChange={handleQtyChange}
                    className="mt-2 rounded border p-1"
                >
                    {[...Array(10).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                            {x + 1}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={() => dispatch(removeFromCart(item.product._id))}
                className="text-sm text-red-500 font-semibold hover:text-red-700"
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;
