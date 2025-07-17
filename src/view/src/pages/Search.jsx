import { useEffect, useState, useCallback } from "react";
import { useSearchAnimesInfiniteQuery } from "../features/anime/animeService";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LodaingSpinner";

export function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = {
    q: searchParams.get("q") || "",
    status: searchParams.get("status") || "",
    releaseYear: searchParams.get("releaseYear") || "",
    sortField: searchParams.get("sortField") || "",
    sortOrder: searchParams.get("sortOrder") || "",
  };

  const [searchQuery, setSearchQuery] = useState(initialQuery.q);
  const [advancedFilters, setAdvancedFilters] = useState({
    status: initialQuery.status,
    releaseYear: initialQuery.releaseYear,
    sortField: initialQuery.sortField,
    sortOrder: initialQuery.sortOrder,
  });

  const [showAdvanced, setShowAdvanced] = useState(
    Object.values(initialQuery).some((val) => val !== "")
  );

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useSearchAnimesInfiniteQuery(
      {
        q: searchQuery,
        ...advancedFilters,
      },
      {
        initialData: { pages: [], pageParams: [] },
        select: (data) => {
          return {
            ...data,
            pages: data.pages || [],
          };
        },
      }
    );

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setAdvancedFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      /* empty */
    }
  };

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("q", searchQuery);
    if (advancedFilters.status) params.set("status", advancedFilters.status);
    if (advancedFilters.releaseYear)
      params.set("releaseYear", advancedFilters.releaseYear);
    if (advancedFilters.sortField)
      params.set("sortField", advancedFilters.sortField);
    if (advancedFilters.sortOrder)
      params.set("sortOrder", advancedFilters.sortOrder);

    navigate(`?${params.toString()}`, { replace: true });
  }, [searchQuery, advancedFilters, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, loadMore]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) navigate("/404");

  const animeList = data?.pages?.flatMap((page) => page.data) || [];

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Поисковая панель */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Поиск аниме
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-4 top-4 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="mt-4 text-blue-500 hover:text-blue-700 text-sm font-medium"
        >
          {showAdvanced ? "Скрыть фильтры" : "Продвинутый поиск"}
        </button>
      </div>

      {showAdvanced && (
        <div className="max-w-3xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Статус
              </label>
              <select
                name="status"
                value={advancedFilters.status}
                onChange={handleFilterChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Все</option>
                <option value="ongoing">Онгоинг</option>
                <option value="released">Вышло</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Год выпуска
              </label>
              <input
                type="number"
                name="releaseYear"
                value={advancedFilters.releaseYear}
                onChange={handleFilterChange}
                placeholder="2023"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Сортировать по
              </label>
              <select
                name="sortField"
                value={advancedFilters.sortField}
                onChange={handleFilterChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Без сортировки</option>
                <option value="title">Название</option>
                <option value="releaseYear">Год выпуска</option>
                <option value="rating">Рейтинг</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Порядок
              </label>
              <select
                name="sortOrder"
                value={advancedFilters.sortOrder}
                onChange={handleFilterChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={!advancedFilters.sortField}
              >
                <option value="">-</option>
                <option value="ASC">По возрастанию</option>
                <option value="DESC">По убыванию</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animeList.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            Ничего не найдено
          </p>
        ) : (
          animeList.map((anime) => (
            <div
              key={anime.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={anime.coverUrl || "https://via.placeholder.com/300x400 "}
                alt={anime.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {anime.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {anime.releaseYear || "—"}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 font-bold">
                    {anime.rating}
                  </span>
                  <span className="ml-1 text-gray-500 text-sm">/ 10</span>
                </div>
                <div className="flex items-center mt-2">
                  <button
                    className="border-1 border-blue-500 border-r-4 text-gray-600 hover:text-blue-500 cursor-pointer"
                    onClick={() => navigate("/anime/" + anime.id)}
                  >
                    Смотреть
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {hasNextPage && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </div>
  );
}
