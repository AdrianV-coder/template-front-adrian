import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { createPost } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

function CreatePostPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Debes iniciar sesión para crear un post');
      return;
    }

    try {
      const newPost = await createPost({ title, body, userId: user.id });

      console.log('Post creado:', newPost);
      alert('¡Post creado con éxito!');
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error al crear el post:', error);
      alert('No se pudo crear el post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6">
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Creación de Posts</h2>

            <button className="bg-teal-400 hover:bg-teal-600 px-4 py-2 rounded">
              <Link to="/home">Return</Link>
            </button>
        </nav>

        <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Crear nuevo post</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
            <textarea
              placeholder="Contenido"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded h-32"
              required
            />
            <button
              type="submit"
              className="bg-teal-500 text-white w-full py-2 rounded hover:bg-teal-600 transition"
            >
              Crear Post
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreatePostPage;
