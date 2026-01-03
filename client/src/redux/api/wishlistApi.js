import { apiSlice } from './apiSlice';

export const wishlistApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: () => '/wishlist',
            providesTags: ['Wishlist'],
        }),

        addToWishlist: builder.mutation({
            query: (productId) => ({
                url: '/wishlist/add',
                method: 'POST',
                body: { productId },
            }),
            invalidatesTags: ['Wishlist'],
        }),

        removeFromWishlist: builder.mutation({
            query: (productId) => ({
                url: `/wishlist/remove/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Wishlist'],
        }),

        clearWishlist: builder.mutation({
            query: () => ({
                url: '/wishlist/clear',
                method: 'DELETE',
            }),
            invalidatesTags: ['Wishlist'],
        }),

        checkWishlistStatus: builder.query({
            query: (productId) => `/wishlist/check/${productId}`,
            providesTags: (result, error, productId) => [
                { type: 'Wishlist', id: productId },
            ],
        }),

        moveToCart: builder.mutation({
            query: (productId) => ({
                url: '/wishlist/move-to-cart',
                method: 'POST',
                body: { productId },
            }),
            invalidatesTags: ['Wishlist', 'Cart'],
        }),
    }),
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useClearWishlistMutation,
    useCheckWishlistStatusQuery,
    useMoveToCartMutation,
} = wishlistApi;