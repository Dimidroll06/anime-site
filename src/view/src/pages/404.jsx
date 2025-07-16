import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/");

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-blue-500">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Страница не найдена
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Извините, но страницы, которую вы ищете, не существует
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            onClick={handleGoHome}
            className="cursor-pointer rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            Вернуться на главную
          </a>
        </div>
      </div>
    </main>
  );
}
