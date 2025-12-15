import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../store/userSlice';
import { login as authLogin } from '../store/authSlice';
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) navigate('/home');
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authenticatedUser = await dispatch(loginUser(username)).unwrap();

      dispatch(authLogin(authenticatedUser));

      navigate('/home', { replace: true });
    } catch {
      alert('No se pudo iniciar sesión');
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
              <XVIcon icon={FontAwesomeIconsLibrary.ArrowRight} />
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
