import { apiSlice } from './apiSlice';

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => {
                const queryString = new URLSearchParams(params).toString();
                return `/products?${queryString}`;
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.products.map(({ _id }) => ({ type: 'Product', id: _id })),
                        { type: 'Product', id: 'LIST' },
                    ]
                    : [{ type: 'Product', id: 'LIST' }],
        }),

        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        getFeaturedProducts: builder.query({
            query: () => '/products/featured',
            providesTags: [{ type: 'Product', id: 'FEATURED' }],
        }),

        getProductsByCategory: builder.query({
            query: (category) => `/products/categories/${category}`,
            providesTags: (result, error, category) => [
                { type: 'Product', id: `CATEGORY-${category}` },
            ],
        }),

        searchProducts: builder.query({
            query: (searchQuery) => `/products?search=${searchQuery}`,
            providesTags: [{ type: 'Product', id: 'SEARCH' }],
        }),

        getRelatedProducts: builder.query({
            query: (id) => `/products/${id}/related`,
            providesTags: (result, error, id) => [{ type: 'Product', id: `RELATED-${id}` }],
        }),

        getTrendingProducts: builder.query({
            query: (limit = 10) => `/products/trending?limit=${limit}`,
            providesTags: [{ type: 'Product', id: 'TRENDING' }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetFeaturedProductsQuery,
    useGetProductsByCategoryQuery,
    useSearchProductsQuery,
    useGetRelatedProductsQuery,
    useGetTrendingProductsQuery,
} = productApi;