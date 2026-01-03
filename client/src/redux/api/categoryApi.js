import { apiSlice } from './apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/categories',
            providesTags: [{ type: 'Category', id: 'LIST' }],
        }),

        getCategoryById: builder.query({
            query: (id) => `/categories/${id}`,
            providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),

        getCategoryBySlug: builder.query({
            query: (slug) => `/categories/slug/${slug}`,
            providesTags: (result) =>
                result ? [{ type: 'Category', id: result._id }] : [],
        }),

        getProductsByCategory: builder.query({
            query: ({ categoryId, params = {} }) => {
                const queryString = new URLSearchParams(params).toString();
                return `/categories/${categoryId}/products?${queryString}`;
            },
            providesTags: (result, error, { categoryId }) => [
                { type: 'Product', id: `CATEGORY-${categoryId}` },
            ],
        }),

        getCategoryTree: builder.query({
            query: () => '/categories/tree',
            providesTags: [{ type: 'Category', id: 'TREE' }],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useGetCategoryBySlugQuery,
    useGetProductsByCategoryQuery,
    useGetCategoryTreeQuery,
} = categoryApi;