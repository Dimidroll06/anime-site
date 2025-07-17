import { useState } from "react";
import ProfileMenu from "../components/ProfileMenu";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Главная", path: "/" },
    { name: "Аниме", path: "/anime" },
    { name: "Избранное", path: "/favorites" },
  ];

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-xl font-bold text-gray-800">MyAnime</div>

            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Открыть меню"
            >
              ☰
            </button>

            <ProfileMenu />
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute inset-0" onClick={toggleMenu}></div>
          <nav className="relative z-10 bg-white rounded-lg shadow-lg w-4/5 max-w-sm p-6 animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={toggleMenu}
              aria-label="Закрыть меню"
            >
              &times;
            </button>
            <ul className="flex flex-col space-y-4 mt-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="block text-gray-700 hover:text-blue-500 text-lg"
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
