import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/home');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Registro</h2>

        <input type="text" placeholder="Nombre" className="border p-2 w-full mb-3" />
        <input type="email" placeholder="Correo" className="border p-2 w-full mb-3" />
        <input type="password" placeholder="Contraseña" className="border p-2 w-full mb-3" />

        <button type="submit" className="bg-teal-500 text-white w-full py-2 rounded mb-3">
          Registrarse
        </button>

        <p className="text-center">
          ¿Ya tienes cuenta? <Link to="/" className="text-teal-600">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
