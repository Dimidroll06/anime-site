import ProfileMenu from "../components/ProfileMenu";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Левая часть: логотип и навигация */}
        <div className="flex items-center space-x-6">
          {/* Логотип */}
          <div className="text-xl font-bold text-gray-800">MyAnime</div>

          {/* Навигация */}
          <nav className="hidden md:flex space-x-6">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              Главная
            </a>
            <a
              href="/anime"
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              Аниме
            </a>
            <a
              href="/favorites"
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              Избранное
            </a>
          </nav>
        </div>

        {/* Правая часть: пользователь */}
        <div className="flex items-center space-x-4">
          {/* Аватарка или кнопка профиля */}
          <button className="md:hidden mr-5 cursor-pointer">Меню</button>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
