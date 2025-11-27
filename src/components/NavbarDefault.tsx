
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function NavbarDefault() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAccount = () => {
    navigate('/account');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Mi Red Social</h2>

      <div className="flex gap-3 justify-center items-center">
        <button className="bg-teal-400 hover:bg-teal-600 px-4 py-2 rounded">
          Crear Post
        </button>

        <button
          onClick={handleAccount}
          className="bg-teal-400 hover:bg-teal-600 px-4 py-2 rounded"
        >
          Account
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </nav>
  );
}
