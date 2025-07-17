import { useState, useEffect } from "react";
import {
  useGetEpisodePlayersAndDubbingsQuery,
  useGetAnimeEpisodesStatsQuery,
} from "../features/video/videoService";

export function VideoPlayer({ animeId, initialEpisode = 1 }) {
  const [episode, setEpisode] = useState(initialEpisode);
  const { data: episodeData, isLoading: isEpisodesLoading, error } =
    useGetEpisodePlayersAndDubbingsQuery({
      animeId,
      number: episode,
    });

  const { data: stats, isLoading: isEpisodesStatsLoading } =
    useGetAnimeEpisodesStatsQuery(animeId);

  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedDubbing, setSelectedDubbing] = useState("");

  useEffect(() => {
    if (episodeData?.videos?.length > 0) {
      const firstVideo = episodeData.videos[0];
      setSelectedPlayer(firstVideo.player);
      setSelectedDubbing(firstVideo.dubbing);
    }
  }, [episodeData]);

  if (isEpisodesLoading || isEpisodesStatsLoading) return;

  const handleEpisodeChange = (newEpisode) => {
    if (newEpisode >= 1 && newEpisode <= stats.totalEpisodes) {
      setEpisode(newEpisode);
    }
  };

  const filteredVideos = episodeData?.videos.filter(
    (video) =>
      video.player === selectedPlayer && video.dubbing === selectedDubbing
  );

  const currentVideo = filteredVideos?.[0];

  const getEpisodeButtons = () => {
    const episodeButtons = [];

    for (let i = 0; i < stats.totalEpisodes; i++) {
      if (episode != i + 1) {
        episodeButtons.push(
          <button
            className="h-11 w-14 text-gray-500 hover:text-blue-500 cursor-pointer"
            key={i}
            onClick={() => handleEpisodeChange(i + 1)}
          >
            {i + 1}
          </button>
        );
      } else {
        episodeButtons.push(
          <button
            className="h-11 w-14 text-blue-500 border-b-1 border-b-blue-500 bold"
            key={i}
            disabled
          >
            {i + 1}
          </button>
        );
      }
    }

    return episodeButtons;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Смотреть аниме
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Плеер
          </label>
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            {[
              ...new Set(
                episodeData.videos.map((v) => v.player).filter(Boolean)
              ),
            ].map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        </div>

        <div className="md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Озвучка
          </label>
          <select
            value={selectedDubbing}
            onChange={(e) => setSelectedDubbing(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            {[
              ...new Set(
                episodeData.videos.map((v) => v.dubbing).filter(Boolean)
              ),
            ].map((dub) => (
              <option key={dub} value={dub}>
                {dub}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full aspect-w-16 aspect-h-9 mb-4">
        {currentVideo?.iframe_url && !error ? (
          <iframe
            src={currentVideo.iframe_url}
            title={`Серия ${episode}`}
            className="w-full h-96 rounded-md border"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex items-center justify-center bg-gray-100 rounded-md h-96 text-gray-500">
            Нет доступного видео
          </div>
        )}
      </div>

      <div className="w-full h-12 flex flex-row overflow-x-scroll overflow-y-hidden">
        {getEpisodeButtons()}
      </div>
    </div>
  );
}
