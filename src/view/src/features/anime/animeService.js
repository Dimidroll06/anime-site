// src/services/animeApi.js

import { api } from '../../app/api';

export const animeApi = api.injectEndpoints({
    endpoints: (build) => ({

        searchAnimes: build.infiniteQuery({
            query: (params) => {
                let q = {};
                if (params.q) q.q = params.q;
                if (params.status) q.status = params.status;
                if (params.releaseYear) q.releaseYear = params.releaseYear;
                if (params.sortField) q.sortField = params.sortField;
                if (params.sortOrder) q.sortOrder = params.sortOrder;

                return {
                    url: '/anime',
                    method: 'GET',
                    params: {
                        ...q,
                        limit: params.limit || 10,
                        offset: params.offset || 0,
                    },
                };
            },

            serializeQueryArgs: ({ queryArgs, endpointName }) => {
                const { q, status, releaseYear, sortField, sortOrder } = queryArgs;
                return `${endpointName}(${JSON.stringify({ q, status, releaseYear, sortField, sortOrder })})`;
            },

            merge: (currentCache, newItems) => {
                if (!newItems || !Array.isArray(newItems.pages)) {
                    return;
                }

                if (!currentCache) {
                    currentCache = [...newItems.pages];
                } else {
                    currentCache.push(...newItems.pages);
                }
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.offset !== previousArg?.offset;
            },

            transformResponse: (response, _meta, arg) => {
                return {
                    data: response.data || [],
                    total: response.total || 0,
                    limit: response.limit || 10,
                    offset: response.offset || 0,
                    params: arg

                };
            },

            infiniteQueryOptions: {
                initialPageParam: {
                    offset: 0,
                    limit: 20,
                },

                getNextPageParam: (lastPage) => {
                    const { limit, offset, total } = lastPage;

                    if (!limit || !offset || !total) {
                        return undefined;
                    }

                    const currentPage = Math.floor(offset / limit);
                    const totalPages = Math.ceil(total / limit);
                    const hasNextPage = currentPage < totalPages - 1;

                    if (!hasNextPage) {
                        return undefined;
                    }

                    return {
                        ...lastPage,
                        offset: offset + limit
                    };
                },
            }
        }),

        getRandomAnimes: build.query({
            query: (limit = 5) => ({
                url: '/anime/random',
                method: 'GET',
                params: { limit },
            }),
            providesTags: ['Anime'],
        }),

        getRandomCovers: build.query({
            query: (limit = 10) => ({
                url: '/anime/random/covers',
                method: 'GET',
                params: { limit },
            }),
            providesTags: [],
        }),

        getAnimeById: build.query({
            query: (id) => ({
                url: `/anime/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Anime', id }],
        }),
    })
});

export const {
    useSearchAnimesInfiniteQuery,
    useGetRandomAnimesQuery,
    useGetRandomCoversQuery,
    useGetAnimeByIdQuery,
} = animeApi;