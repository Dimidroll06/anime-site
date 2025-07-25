import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';

const $api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

export const baseQueryWithToken = async (req) => {
    const { url, method, data, params } = req;

    const isFormData = req.formData === true;

    try {
        const token = localStorage.getItem('token');
        const headers = token ? { authorization: `Bearer ${token}` } : {};

        let requestData = data;

        if (isFormData && data instanceof Object && !(data instanceof FormData)) {
            const fd = new FormData();
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const value = data[key];
                    if (value instanceof FileList) {
                        for (let i = 0; i < value.length; i++) {
                            fd.append(key, value[i]);
                        }
                    } else {
                        fd.append(key, value);
                    }
                }
            }
            requestData = fd;
        }

        const res = await $api({
            url,
            method,
            data: requestData,
            params,
            headers,
        });

        return { data: res.data };

    } catch (error) {
        if (error.response?.status === 401) {
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
    tagTypes: ['Auth', 'Video', 'Anime'],
    endpoints: () => ({}),
});