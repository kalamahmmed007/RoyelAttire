import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "../../services/api";

const ProductReview = ({ productId, reviews, refresh }) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/reviews", { productId, rating, comment });
            setComment("");
            setRating(5);
            toast.success("Review submitted!");
            refresh(); // reload reviews
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to submit review");
        }
    };

    return (
        <div className="mt-6">
            <h3 className="mb-2 font-semibold">Reviews</h3>
            <ul className="mb-4 space-y-2">
                {reviews?.map((r) => (
                    <li key={r._id} className="rounded border p-2">
                        <strong>{r.user.name}</strong> - {r.rating} ⭐
                        <p>{r.comment}</p>
                    </li>
                ))}
            </ul>

            <form onSubmit={submitReview} className="flex flex-col gap-2">
                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-32 rounded border p-2"
                >
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                            {n} Star{n > 1 ? "s" : ""}
                        </option>
                    ))}
                </select>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a review..."
                    className="rounded border p-2"
                />
                <button
                    type="submit"
                    className="w-32 rounded bg-black px-4 py-2 text-white"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductReview;