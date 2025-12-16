import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";
import { logout as authLogout } from '../store/authSlice';
import { logout as userLogout } from '../store/userSlice';
import type { AppDispatch } from '../store/index';

export function NavbarDefault() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
      return localStorage.getItem("data-theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
   
      localStorage.setItem("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
   
      localStorage.setItem("data-theme", "light");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    dispatch(authLogout());
    dispatch(userLogout());
    navigate('/', { replace: true });
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h2 className="text-xl font-bold hover:text-teal-400 transition">Mi Red Social</h2>

      <div className="flex gap-4 items-center">
        <Link
          to="/create-post"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <XVIcon icon={FontAwesomeIconsLibrary.Plus} />
          Crear Post
        </Link>

        <Link
          to="/statistics"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <XVIcon icon={FontAwesomeIconsLibrary.ChartLine} />
          Statistics
        </Link>

        <Link
          to="/account"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <XVIcon icon={FontAwesomeIconsLibrary.User} />
          Account
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsDarkMode(prev => !prev)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition duration-300"
          title={isDarkMode ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
        >
          <XVIcon icon={isDarkMode ? FontAwesomeIconsLibrary.CircleRegular : FontAwesomeIconsLibrary.LightbulbOn} />
          {isDarkMode ? 'Noche' : 'Día'}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
        >
          <XVIcon icon={FontAwesomeIconsLibrary.RightFromBracket} />
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}