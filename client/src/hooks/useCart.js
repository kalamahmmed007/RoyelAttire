import { useSelector, useDispatch } from 'react-redux';
import {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    initializeCart,
} from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export const useCart = () => {
    const dispatch = useDispatch();
    const { items, totalAmount, totalItems } = useSelector((state) => state.cart);

    // Initialize cart on mount
    useEffect(() => {
        dispatch(initializeCart());
    }, [dispatch]);

    // Add item to cart
    const addItem = (product, quantity = 1) => {
        try {
            dispatch(addToCart({ product, quantity }));
            toast.success(`${product.name} added to cart`);
        } catch (error) {
            toast.error('Failed to add item to cart');
        }
    };

    // Remove item from cart
    const removeItem = (productId) => {
        try {
            dispatch(removeFromCart(productId));
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    // Update item quantity
    const updateItemQuantity = (productId, quantity) => {
        try {
            dispatch(updateQuantity({ id: productId, quantity }));
        } catch (error) {
            toast.error('Failed to update quantity');
        }
    };

    // Increment quantity
    const incrementQuantity = (productId) => {
        const item = items.find((item) => item._id === productId);
        if (item) {
            updateItemQuantity(productId, item.quantity + 1);
        }
    };

    // Decrement quantity
    const decrementQuantity = (productId) => {
        const item = items.find((item) => item._id === productId);
        if (item && item.quantity > 1) {
            updateItemQuantity(productId, item.quantity - 1);
        }
    };

    // Clear cart
    const clearAllItems = () => {
        try {
            dispatch(clearCart());
            toast.success('Cart cleared');
        } catch (error) {
            toast.error('Failed to clear cart');
        }
    };

    // Check if item is in cart
    const isInCart = (productId) => {
        return items.some((item) => item._id === productId);
    };

    // Get item from cart
    const getItem = (productId) => {
        return items.find((item) => item._id === productId);
    };

    // Get item quantity
    const getItemQuantity = (productId) => {
        const item = getItem(productId);
        return item ? item.quantity : 0;
    };

    // Calculate subtotal
    const getSubtotal = () => {
        return totalAmount;
    };

    // Calculate tax (example: 10%)
    const getTax = (taxRate = 0.1) => {
        return totalAmount * taxRate;
    };

    // Calculate shipping
    const getShipping = (shippingCost = 0) => {
        return totalAmount >= 50 ? 0 : shippingCost; // Free shipping over $50
    };

    // Calculate total
    const getTotal = (taxRate = 0.1, shippingCost = 0) => {
        return totalAmount + getTax(taxRate) + getShipping(shippingCost);
    };

    // Check if cart is empty
    const isEmpty = items.length === 0;

    return {
        items,
        totalAmount,
        totalItems,
        isEmpty,
        addItem,
        removeItem,
        updateItemQuantity,
        incrementQuantity,
        decrementQuantity,
        clearAllItems,
        isInCart,
        getItem,
        getItemQuantity,
        getSubtotal,
        getTax,
        getShipping,
        getTotal,
    };
};

export default useCart;