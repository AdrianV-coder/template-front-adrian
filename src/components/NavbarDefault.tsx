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

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
      >
        <XVIcon icon={FontAwesomeIconsLibrary.RightFromBracket} />
        Cerrar sesión
      </button>
    </nav>
  );
}