import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";
import { logout as authLogout } from '../store/authSlice';
import { logout as userLogout } from '../store/userSlice';
import type { AppDispatch } from '../store/index';
import { useTranslation } from 'react-i18next';

export function NavbarDefault() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
      return localStorage.getItem("data-theme") === "dark";
  });
  const { t, i18n } = useTranslation(['navbar', 'common']);

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
      <h2 className="text-xl font-bold hover:text-teal-400 transition">{t('appName', { ns: 'common' })}</h2>

      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => void i18n.changeLanguage('es')}
            className={`px-3 py-1 rounded ${i18n.language === 'es' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
          >
            ES
          </button>
          <button
            onClick={() => void i18n.changeLanguage('en')}
            className={`px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
          >
            EN
          </button>
        </div>

        <Link
          to="/create-post"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <XVIcon icon={FontAwesomeIconsLibrary.Plus} />
          {t('createPost')}
        </Link>

        <Link
          to="/statistics"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <XVIcon icon={FontAwesomeIconsLibrary.ChartLine} />
          {t('statistics')}
        </Link>

        <Link
          to="/account"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <XVIcon icon={FontAwesomeIconsLibrary.User} />
          {t('account')}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsDarkMode(prev => !prev)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition duration-300"
          title={isDarkMode ? t('themeDay') : t('themeNight')}
        >
          <XVIcon icon={isDarkMode ? FontAwesomeIconsLibrary.CircleRegular : FontAwesomeIconsLibrary.LightbulbOn} />
          {isDarkMode ? t('themeDay') : t('themeNight')}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
        >
          <XVIcon icon={FontAwesomeIconsLibrary.RightFromBracket} />
          {t('logout')}
        </button>
      </div>
    </nav>
  );
}