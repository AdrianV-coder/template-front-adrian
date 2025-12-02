import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/apiService';

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newUser = await registerUser({ username, email, password });
      console.log('Usuario registrado:', newUser);

      login(username);
      navigate('/');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('No se pudo registrar el usuario');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Registro</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />

        <button type="submit" className="bg-teal-500 text-white w-full py-2 rounded mb-3">
          Registrarse
        </button>

        <p className="text-center">
          ¿Ya tienes cuenta? <Link to="/" className="text-teal-600">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
