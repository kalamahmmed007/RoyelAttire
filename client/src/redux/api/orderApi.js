import { apiSlice } from './apiSlice';

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: '/orders',
                method: 'POST',
                body: orderData,
            }),
            invalidatesTags: ['Order', 'Cart'],
        }),

        getOrders: builder.query({
            query: () => '/orders',
            providesTags: (result) =>
                result
                    ? [
                        ...result.orders.map(({ _id }) => ({ type: 'Order', id: _id })),
                        { type: 'Order', id: 'LIST' },
                    ]
                    : [{ type: 'Order', id: 'LIST' }],
        }),

        getOrderById: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: (result, error, id) => [{ type: 'Order', id }],
        }),

        cancelOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Order', id },
                { type: 'Order', id: 'LIST' },
            ],
        }),

        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/orders/${id}/status`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Order', id },
                { type: 'Order', id: 'LIST' },
            ],
        }),

        getOrderTracking: builder.query({
            query: (id) => `/orders/${id}/tracking`,
            providesTags: (result, error, id) => [{ type: 'Order', id: `TRACKING-${id}` }],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCancelOrderMutation,
    useUpdateOrderStatusMutation,
    useGetOrderTrackingQuery,
} = orderApi;