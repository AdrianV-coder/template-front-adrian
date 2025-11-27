
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      localStorage.setItem('access_token', 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0c1RsdERmYWZCc1I1YkdpNHJmODM3WVlYRUxLS0NqVFBvdjZmNXRBRVZrIn0.eyJleHAiOjE4MTMxNDMzMTksImlhdCI6MTc2MTMwMzMxOSwiYXV0aF90aW1lIjoxNzYxMzAzMzE5LCJqdGkiOiIyODE0NjAxYS1lMjQyLTQxYmUtYjkxYS00M2QyOThmNWVlNDQiLCJpc3MiOiJodHRwczovL2F1dGgtZXUtdGVzdC5nby1haWd1YS5jb20vYXV0aC9yZWFsbXMvZGV2X3Byb2R1Y3QiLCJzdWIiOiIyZmJjNDU3ZS0yMzcxLTRhZWUtODMyMS0xMTg5ZTQ5NDM4ZjMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnby1haWd1YS1zb2MiLCJzZXNzaW9uX3N0YXRlIjoiNDk1NzczYmUtZTk0MC00NGI4LWJjNGYtYjhjMWRjMmJhNWUwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgZ29haWd1YSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ1c2VyX25hbWUiOiJhZHJpYW4udmVybmljaEBpZHJpY2EuY29tIiwibmFtZSI6IkFkcmlhbiBWZXJuaWNoIHwgSURSSUNBIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRyaWFuLnZlcm5pY2hAaWRyaWNhLmNvbSIsImdpdmVuX25hbWUiOiJBZHJpYW4gVmVybmljaCB8IiwiZmFtaWx5X25hbWUiOiJJRFJJQ0EiLCJlbWFpbCI6ImFkcmlhbi52ZXJuaWNoQGlkcmljYS5jb20ifQ.fAhNLwJZ9ZmaySb57vPActafJVcy-BZ42M2mJkj1umJVT90dOfzaSgogcGi_36WZibfa6sSaCOvcZQM1NbOYZPCJa1YZUO3gnWRpkHFkU3btCViKvFK_rlHlomzuhL89qB3na0Lu-LIMqkFkc3riZ-e3_rik1rucsXeqTYrUTC1otwaD61jmzyDRR3_ZsVCt853azWwO8j4wEzdQ8-T6aYdVz7PkDR9SLIHKOL5JPYKrEVrkjQJkLaYy26ZeABVQMktUEw7_BNk9oEdLk3DQxaGuMfWyg1k_U6x7eP5gZHGlzdEgJ9Ph7_SB2jPKFnt4V4gzweP_st1O-Bz5SKsX4w');
      const token = localStorage.getItem('access_token');

      const response = await fetch(`http://localhost:20001/users/by-username?username=${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al validar usuario');
      }

      const userData = await response.json();

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
