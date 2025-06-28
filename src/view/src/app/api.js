import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
});

export const baseQueryWithToken = async (args, api, extraOptions) => {
    const token = localStorage.getItem('token');
    const requestArgs = {
        ...args,
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };

    let result = await baseQuery(requestArgs, api, extraOptions);

    if (result.error?.status === 401) {
        try {
            const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
            if (refreshResult.data) {
                const { token } = refreshResult.data;
                localStorage.setItem('token', token);
                result = await baseQuery(
                    {
                        ...requestArgs,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                    api,
                    extraOptions
                );
            }
        } catch (e) {
            console.error('Не авторизован', e);
        }
    }

    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithToken,
    tagTypes: ['Auth'],
    endpoints: () => ({}),
});