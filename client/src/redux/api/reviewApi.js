import { apiSlice } from './apiSlice';

export const reviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductReviews: builder.query({
            query: (productId) => `/reviews/product/${productId}`,
            providesTags: (result, error, productId) => [
                { type: 'Review', id: `PRODUCT-${productId}` },
            ],
        }),

        createReview: builder.mutation({
            query: (reviewData) => ({
                url: '/reviews',
                method: 'POST',
                body: reviewData,
            }),
            invalidatesTags: (result, error, { productId }) => [
                { type: 'Review', id: `PRODUCT-${productId}` },
                { type: 'Product', id: productId },
            ],
        }),

        updateReview: builder.mutation({
            query: ({ id, ...reviewData }) => ({
                url: `/reviews/${id}`,
                method: 'PUT',
                body: reviewData,
            }),
            invalidatesTags: (result, error, { productId }) => [
                { type: 'Review', id: `PRODUCT-${productId}` },
                { type: 'Product', id: productId },
            ],
        }),

        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Review', 'Product'],
        }),

        getUserReviews: builder.query({
            query: () => '/reviews/user',
            providesTags: [{ type: 'Review', id: 'USER' }],
        }),

        likeReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}/like`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Review', id }],
        }),

        reportReview: builder.mutation({
            query: ({ id, reason }) => ({
                url: `/reviews/${id}/report`,
                method: 'POST',
                body: { reason },
            }),
        }),
    }),
});

export const {
    useGetProductReviewsQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetUserReviewsQuery,
    useLikeReviewMutation,
    useReportReviewMutation,
} = reviewApi;