import { useState, useEffect, useRef } from "react";

export default function ProfileMenu() {
  const [menuOpened, setMenuOpened] = useState(false);
  const menuRef = useRef(null);

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
    return () => console.log(item);
  };

  return (
    <div
      className="relative group flex cursor-pointer"
      ref={menuRef}
      onClick={() => setMenuOpened(!menuOpened)}
    >
      <span className="pr-4 pt-1 pl-5 select-none ">⌵</span>
      <img
        src="https://i.pinimg.com/736x/3c/1b/1c/3c1b1c5aba1ed84b84175ab349a5af0d.jpg"
        alt="User Avatar"
        className="w-9 h-9 rounded-full border border-gray-300 object-cover"
      />
      {menuOpened && (
        <div className="absolute w-60 pt-4 pb-4 bg-white/70 rounded-2xl right-0 top-13 cursor-auto overflow-hidden">
          <button className="w-60 cursor-pointer hover:text-blue-500 hover:bg-blue-100 transition-colors" onClick={handleMenuClick("profile")}>
            Мой профиль
          </button>
          <button className="w-60 cursor-pointer hover:text-blue-500 hover:bg-blue-100 transition-colors" onClick={handleMenuClick("admin")}>
            Панель администратора
          </button>
          <button className="w-60 cursor-pointer hover:text-blue-500 hover:bg-blue-100 transition-colors" onClick={handleMenuClick("logout")}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}
