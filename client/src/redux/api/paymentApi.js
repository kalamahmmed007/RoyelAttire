import { apiSlice } from './apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPaymentIntent: builder.mutation({
            query: (amount) => ({
                url: '/payment/create-intent',
                method: 'POST',
                body: { amount },
            }),
        }),

        confirmPayment: builder.mutation({
            query: (paymentIntentId) => ({
                url: '/payment/confirm',
                method: 'POST',
                body: { paymentIntentId },
            }),
        }),

        getPaymentMethods: builder.query({
            query: () => '/payment/methods',
            providesTags: ['User'],
        }),

        addPaymentMethod: builder.mutation({
            query: (paymentMethodData) => ({
                url: '/payment/methods',
                method: 'POST',
                body: paymentMethodData,
            }),
            invalidatesTags: ['User'],
        }),

        deletePaymentMethod: builder.mutation({
            query: (id) => ({
                url: `/payment/methods/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),

        setDefaultPaymentMethod: builder.mutation({
            query: (id) => ({
                url: `/payment/methods/${id}/default`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),

        refundPayment: builder.mutation({
            query: ({ orderId, amount, reason }) => ({
                url: '/payment/refund',
                method: 'POST',
                body: { orderId, amount, reason },
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const {
    useCreatePaymentIntentMutation,
    useConfirmPaymentMutation,
    useGetPaymentMethodsQuery,
    useAddPaymentMethodMutation,
    useDeletePaymentMethodMutation,
    useSetDefaultPaymentMethodMutation,
    useRefundPaymentMutation,
} = paymentApi;