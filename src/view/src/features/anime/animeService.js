// src/services/animeApi.js

import { api } from '../../app/api';

export const animeApi = api.injectEndpoints({
    endpoints: (build) => ({

        searchAnimes: build.infiniteQuery({
            query: (params) => ({
                url: '/anime',
                method: 'GET',
                params: {
                    ...params,
                    limit: params.limit || 10,
                    offset: params.offset || 0,
                },
            }),

            providesTags: ['Anime'],

            serializeQueryArgs: ({ queryArgs, endpointName }) => {
                const { q, status, releaseYear, sortField, sortOrder } = queryArgs;
                return `${endpointName}(${JSON.stringify({ q, status, releaseYear, sortField, sortOrder })})`;
            },

            merge: (currentCache, newItems) => {
                currentCache.data.push(...newItems.data);
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.offset !== previousArg?.offset;
            },
            
            // eslint-disable-next-line no-unused-vars
            getNextPageParam: (lastPage, _allPages) => {
                const currentPage = lastPage.offset / lastPage.limit;
                const hasNextPage = currentPage < lastPage.totalPages - 1;

                if (hasNextPage) {
                    return {
                        ...lastPage,
                        offset: lastPage.offset + lastPage.limit,
                    };
                }

                return undefined;
            },
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