import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
    try {
        const wishlist = localStorage.getItem('wishlist');
        return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
        return [];
    }
};

const saveWishlistToStorage = (wishlist) => {
    try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
        console.error('Error saving wishlist:', error);
    }
};

const initialState = {
    items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const product = action.payload;
            const exists = state.items.find(item => item._id === product._id);

            if (!exists) {
                state.items.push({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    stock: product.stock,
                });
                saveWishlistToStorage(state.items);
            }
        },

        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            saveWishlistToStorage(state.items);
        },

        clearWishlist: (state) => {
            state.items = [];
            localStorage.removeItem('wishlist');
        },

        syncWishlist: (state, action) => {
            state.items = action.payload;
            saveWishlistToStorage(state.items);
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    syncWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;