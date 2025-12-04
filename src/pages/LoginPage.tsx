import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserByUsername } from '../services/apiService';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = await getUserByUsername(username);

      if (userData && userData.username === username) {
        login({ id: userData.id, username: userData.username, email: userData.email});
        navigate('/home');
      } else {
        setError('Usuario no encontrado');
      }
    } catch {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-teal-600 mb-2 text-center">Iniciar Sesión</h2>
        <p className="text-gray-500 text-center mb-6">Bienvenido de nuevo</p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-teal-500 text-white w-full py-3 rounded-md hover:bg-teal-600 transition duration-300"
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
          ) : (
            <>
              <ArrowRightIcon className="h-5 w-5" />
              Iniciar Sesión
            </>
          )}
        </button>

        <p className="text-center mt-4 text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-teal-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
