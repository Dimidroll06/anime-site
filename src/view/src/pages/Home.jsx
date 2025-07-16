import { useGetRandomCoversQuery } from "../features/anime/animeService";
import { useState } from "react";
import LoadingSpinner from "../components/LodaingSpinner";

export function Home() {
  const { data, currentData, error, isLoading } = useGetRandomCoversQuery({
    limit: 10,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayInterval = 3000;

  if (isLoading) return <LoadingSpinner />;
  console.log(data, currentData, error);
  const covers = data.data;

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % covers.length);
  };

  setInterval(() => {
    handleNextClick();
  }, autoplayInterval);

  return (
    <>
      {/* Блок с информацией */}
      <div className="relative isolate pt-14 flex flex-col">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          <div
            className="flex transition-transform duration-500 flex-1 w-screen"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {covers.map((cover, i) => (
              <div
                className="carousel-item flex-shrink-0 w-screen overflow-x-hidden"
                key={i}
              >
                <img src={cover} className="w-screen blur-md opacity-20" />
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 relative">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-blue-500 sm:text-7xl">
              Смотри аниме онлайн бесплатно
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-900 sm:text-xl/8">
              Тысячи сериалов и фильмов в одном месте. Смотрите в любое время и
              без ограничений.
            </p>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        ></div>
      </div>
    </>
  );
}
