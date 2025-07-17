import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAnimeByIdQuery } from "../features/anime/animeService";
import { useGetAnimeEpisodesStatsQuery } from "../features/video/videoService";
import LoadingSpinner from "../components/LodaingSpinner";

export function Anime() {
  const navigate = useNavigate();
  const { animeId } = useParams();

  const {
    data: anime,
    isLoading: isAnimeLoading,
    error: animeError,
  } = useGetAnimeByIdQuery(animeId);

  const {
    data: episodesStats,
    isLoading: isEpisodesLoading,
    error: episodesError,
  } = useGetAnimeEpisodesStatsQuery(animeId);

  if (isAnimeLoading || isEpisodesLoading) return <LoadingSpinner />;
  if (animeError || episodesError) {
    console.error(animeError || episodesError);
    navigate("/404");
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="md:w-1/3">
            <img
              src={anime.coverUrl || "https://via.placeholder.com/400x550 "}
              alt={anime.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900">{anime.title}</h1>
            <p className="text-gray-600 mt-2">
              {anime.description || "Описание отсутствует"}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Год:</span>{" "}
                {anime.releaseYear || "Не указан"}
              </div>
              <div>
                <span className="font-semibold">Статус:</span>{" "}
                <span
                  className={`${
                    anime.status === "released"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {anime.status === "released" ? "Вышло" : "Онгоинг"}
                </span>
              </div>
              <div>
                <span className="font-semibold">Эпизодов:</span>{" "}
                {episodesStats.totalEpisodes || 0}
              </div>
              <div>
                <span className="font-semibold">Рейтинг:</span>{" "}
                <span className="text-blue-500 font-bold">{anime.rating}</span>
              </div>
            </div>

            <div className="mt-6">
              <span className="font-semibold">Плееры:</span>{" "}
              {episodesStats.players.length > 0 ? (
                <span className="text-blue-500">
                  {episodesStats.players.join(", ")}
                </span>
              ) : (
                <span className="text-gray-400">Нет доступных плееров</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Смотреть аниме
          </h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-lg font-medium">
            🎬 Плеер временно недоступен
          </div>
        </div>
      </div>
    </div>
  );
}
