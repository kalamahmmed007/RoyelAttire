import { apiSlice } from './apiSlice';

export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => '/cart',
            providesTags: ['Cart'],
        }),

        addToCart: builder.mutation({
            query: ({ productId, quantity }) => ({
                url: '/cart/add',
                method: 'POST',
                body: { productId, quantity },
            }),
            invalidatesTags: ['Cart'],
        }),

        updateCartItem: builder.mutation({
            query: ({ itemId, quantity }) => ({
                url: `/cart/update/${itemId}`,
                method: 'PUT',
                body: { quantity },
            }),
            invalidatesTags: ['Cart'],
        }),

        removeFromCart: builder.mutation({
            query: (itemId) => ({
                url: `/cart/remove/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        clearCart: builder.mutation({
            query: () => ({
                url: '/cart/clear',
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        syncCart: builder.mutation({
            query: (cartItems) => ({
                url: '/cart/sync',
                method: 'POST',
                body: { items: cartItems },
            }),
            invalidatesTags: ['Cart'],
        }),

        applyCoupon: builder.mutation({
            query: (code) => ({
                url: '/cart/coupon',
                method: 'POST',
                body: { code },
            }),
            invalidatesTags: ['Cart'],
        }),

        removeCoupon: builder.mutation({
            query: () => ({
                url: '/cart/coupon',
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
    useSyncCartMutation,
    useApplyCouponMutation,
    useRemoveCouponMutation,
} = cartApi;