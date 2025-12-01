import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserByUsername } from '../services/apiService';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // de momento no se usa en API

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = await getUserByUsername(username);

      if (userData && userData.username === username) {
        login(username);
        navigate('/home');
      } else {
        alert('Usuario no encontrado');
      }
    } catch (error) {
      console.error(error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button type="submit" className="bg-teal-500 text-white w-full py-2 rounded mb-3">
          Iniciar Sesión
        </button>

        <p className="text-center">
          ¿No tienes cuenta? <Link to="/register" className="text-teal-600">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
