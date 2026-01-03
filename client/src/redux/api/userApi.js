import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (userData) => ({
                url: '/users/profile',
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),

        changePassword: builder.mutation({
            query: (passwordData) => ({
                url: '/users/password',
                method: 'PUT',
                body: passwordData,
            }),
        }),

        getUserOrders: builder.query({
            query: () => '/users/orders',
            providesTags: ['Order'],
        }),

        getAddresses: builder.query({
            query: () => '/users/addresses',
            providesTags: ['User'],
        }),

        addAddress: builder.mutation({
            query: (address) => ({
                url: '/users/addresses',
                method: 'POST',
                body: address,
            }),
            invalidatesTags: ['User'],
        }),

        updateAddress: builder.mutation({
            query: ({ id, ...address }) => ({
                url: `/users/addresses/${id}`,
                method: 'PUT',
                body: address,
            }),
            invalidatesTags: ['User'],
        }),

        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/users/addresses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),

        setDefaultAddress: builder.mutation({
            query: (id) => ({
                url: `/users/addresses/${id}/default`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),

        uploadAvatar: builder.mutation({
            query: (formData) => ({
                url: '/users/avatar',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useGetUserOrdersQuery,
    useGetAddressesQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useSetDefaultAddressMutation,
    useUploadAvatarMutation,
} = userApi;