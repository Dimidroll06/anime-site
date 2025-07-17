import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LodaingSpinner";
import { getAuth, getLoading, getUser } from "../features/auth/authSlice";

export default function ProfileMenu() {
  const [menuOpened, setMenuOpened] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const isLoading = useSelector(getLoading);
  const isAuth = useSelector(getAuth);
  const user = useSelector(getUser);

  useEffect(() => {
    const handleClickOutside = () => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (item) => {
    switch (item) {
      case "profile":
        return () => navigate(`/profile/${user.id}`);
      case "admin":
        return () => navigate('/admin');
      case "logout":
        return () => console.log('logout');
      default:
        return () => console.error(`Вызван неизвестный метод '${item}'`)
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (user === null)
    return (
      <button
        onClick={() => navigate("/login")}
        className="text-gray-700 hover:text-blue-500 transition-colors cursor-pointer"
      >
        Войти
      </button>
    );
  if (isAuth)
    return (
      <div
        className="relative group flex cursor-pointer"
        ref={menuRef}
        onClick={() => setMenuOpened(!menuOpened)}
      >
        <span className="pr-4 pt-1 pl-5 select-none ">⌵</span>
        {user.avatarUrl !== null ? (
          <img
            src={'/avatars/'+user.avatarUrl}
            alt="User Avatar"
            className="w-9 h-9 rounded-full border border-gray-300 object-cover bg-blue-300"
          />
        ) : (
          <div className="w-9 h-9 rounded-full flex justify-around border-gray-300 object-cover bg-blue-300 text-blue-950 font-semibold text-2xl select-none">
            {user.username[0].toUpperCase()}
          </div>
        )}

        {menuOpened && (
          <div className="absolute w-60 pt-4 pb-4 bg-white/70 rounded-2xl right-0 top-13 cursor-auto overflow-hidden">
            <button
              className="w-60 cursor-pointer hover:text-blue-500 hover:bg-blue-100 transition-colors"
              onClick={handleMenuClick("profile")}
            >
              Мой профиль
            </button>
            {user.isAdmin && (
              <button
                className="w-60 cursor-pointer hover:text-blue-500 hover:bg-blue-100 transition-colors"
                onClick={handleMenuClick("admin")}
              >
                Панель администратора
              </button>
            )}

            <button
              className="w-60 cursor-pointer hover:text-blue-500 hover:bg-blue-100 transition-colors"
              onClick={handleMenuClick("logout")}
            >
              Выйти
            </button>
          </div>
        )}
      </div>
    );
}
