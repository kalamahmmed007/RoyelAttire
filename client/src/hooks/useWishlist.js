import { useSelector, useDispatch } from 'react-redux';
import {
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} from '../redux/slices/wishlistSlice';
import toast from 'react-hot-toast';

export const useWishlist = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.wishlist);

    // Add item to wishlist
    const addItem = (product) => {
        try {
            dispatch(addToWishlist(product));
            toast.success(`${product.name} added to wishlist`);
        } catch (error) {
            toast.error('Failed to add to wishlist');
        }
    };

    // Remove item from wishlist
    const removeItem = (productId) => {
        try {
            dispatch(removeFromWishlist(productId));
            toast.success('Removed from wishlist');
        } catch (error) {
            toast.error('Failed to remove from wishlist');
        }
    };

    // Toggle item in wishlist
    const toggleItem = (product) => {
        if (isInWishlist(product._id)) {
            removeItem(product._id);
        } else {
            addItem(product);
        }
    };

    // Clear wishlist
    const clearAll = () => {
        try {
            dispatch(clearWishlist());
            toast.success('Wishlist cleared');
        } catch (error) {
            toast.error('Failed to clear wishlist');
        }
    };

    // Check if item is in wishlist
    const isInWishlist = (productId) => {
        return items.some((item) => item._id === productId);
    };

    // Get item from wishlist
    const getItem = (productId) => {
        return items.find((item) => item._id === productId);
    };

    // Check if wishlist is empty
    const isEmpty = items.length === 0;

    // Get wishlist count
    const count = items.length;

    return {
        items,
        count,
        isEmpty,
        addItem,
        removeItem,
        toggleItem,
        clearAll,
        isInWishlist,
        getItem,
    };
};

export default useWishlist;