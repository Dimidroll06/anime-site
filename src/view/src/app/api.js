import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';

const $api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

export const baseQueryWithToken = async ({ url, method, data, params }) => {
    try {
        const token = localStorage.getItem('token');
        const headers = token ? { authorization: `Bearer ${token}` } : {};

        const res = await $api({
            url,
            method,
            data,
            params,
            headers
        });

        return { data: res.data };
        
    } catch (error) {
        if (error.response?.status === 401 && localStorage.getItem('token') != null) {
            try {
                const refreshRes = await $api.post('/auth/refresh', {
                    withCredentials: true
                });

                if (refreshRes.data?.token) {
                    const newToken = refreshRes.data.token;
                    localStorage.setItem('token', newToken);

                    const retryRes = await $api({
                        url,
                        method,
                        data,
                        params,
                        headers: {
                            authorization: `Bearer ${newToken}`
                        }
                    });

                    return { data: retryRes.data };
                }

            } catch (error) {
                console.error('Не авторизован', error);
            }
        }

        return {
            error: {
                status: error.response?.status,
                data: error.resonse?.data || error.message
            }
        }
    }
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithToken,
    tagTypes: ['Auth'],
    endpoints: () => ({}),
});