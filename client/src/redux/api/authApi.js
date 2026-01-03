import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['User', 'Cart', 'Order'],
        }),

        getProfile: builder.query({
            query: () => '/auth/profile',
            providesTags: ['User'],
        }),

        forgotPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: { email },
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: `/auth/reset-password/${token}`,
                method: 'PUT',
                body: { password },
            }),
        }),

        verifyEmail: builder.mutation({
            query: (token) => ({
                url: `/auth/verify-email/${token}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyEmailMutation,
} = authApi;