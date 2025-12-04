import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { PlusIcon, UserIcon, ArrowRightOnRectangleIcon, ChartBarIcon  } from '@heroicons/react/24/outline';

export function NavbarDefault() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h2 className="text-xl font-bold hover:text-teal-400 transition">Mi Red Social</h2>

      <div className="flex gap-4 items-center">
        <Link
          to="/create-post"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <PlusIcon className="h-5 w-5" />
          Crear Post
        </Link>

        <Link
          to="/create-post"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <ChartBarIcon className="h-5 w-5" />
          Statistics
        </Link>

        <Link
          to="/account"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
        >
          <UserIcon className="h-5 w-5" />
          Account
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        Cerrar sesión
      </button>
    </nav>
  );
}