import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/apiService';
import { UserPlusIcon } from '@heroicons/react/24/outline';

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newUser = await registerUser({ username, email, password });
      login({ id: newUser.id, username: newUser.username });
      navigate('/');
    } catch {
      setError('No se pudo registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-teal-600 mb-2 text-center">Registro</h2>
        <p className="text-center mb-6">Crea tu cuenta para comenzar</p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <input
          type="text"
          placeholder="Nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
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
              <UserPlusIcon className="h-5 w-5" />
              Registrarse
            </>
          )}
        </button>

        <p className="text-center mt-4 text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/" className="text-teal-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
