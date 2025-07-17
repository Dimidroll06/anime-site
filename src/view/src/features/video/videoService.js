
import { api } from '../../app/api';

export const videoApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAnimeEpisodesStats: build.query({
            query: (animeId) => ({
                url: `/anime/${animeId}/episode`,
                method: 'GET',
            }),
            providesTags: (result, error, animeId) => [
                { type: 'Video', id: `STATS-${animeId}` },
            ],
        }),

        getEpisodePlayersAndDubbings: build.query({
            query: ({ animeId, number }) => ({
                url: `/anime/${animeId}/episode/${number}`,
                method: 'GET',
            }),
            providesTags: (result, error, { animeId, number }) => [
                { type: 'Video', id: `EPISODE-${animeId}-${number}` },
            ],
        }),
    }),
});

export const {
    useGetAnimeEpisodesStatsQuery,
    useGetEpisodePlayersAndDubbingsQuery,
} = videoApi;