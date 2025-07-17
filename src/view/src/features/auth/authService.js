import { api } from '../../app/api';

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),

        registration: build.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),

        logout: build.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),

        getMe: build.query({
            query: () => ({
                url: '/user/me',
                method: 'POST'
            }),
            providesTags: ['Auth'],
        })
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useLogoutMutation,
    useGetMeQuery,
} = authApi;