import { api } from '../../app/api';

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUserById: build.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET'
            }),
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),

        editProfile: build.mutation({
            query: (userData) => ({
                url: '/user',
                method: 'PUT',
                data: userData,
            }),
            invalidatesTags: ['Auth'],
        }),

        changePassword: build.mutation({
            query: (passwordData) => ({
                url: '/user/password',
                method: 'PUT',
                data: passwordData,
            }),
            invalidatesTags: [],
        }),

        updateAvatar: build.mutation({
            query: (formData) => ({
                url: '/user/avatar',
                method: 'PUT',
                data: formData,
                formData: true,
            }),
            invalidatesTags: ['Auth'],
        }),

        deleteAccount: build.mutation({
            query: () => ({
                url: '/user/',
                method: 'DELETE',
            }),
            invalidatesTags: ['Auth'],
        }),
    })
});

export const {
    useGetUserByIdQuery,
    useEditProfileMutation,
    useChangePasswordMutation,
    useUpdateAvatarMutation,
    useDeleteAccountMutation,
} = userApi;