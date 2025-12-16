import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { createPost } from '../services/apiService';
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";
import { useSelector } from 'react-redux';
import type { RootState } from '../store/index';

function CreatePostPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Debes iniciar sesión para crear un post');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createPost({ title, body, userId: user.id });
      setSuccess(true);
      setTitle('');
      setBody('');
    } catch {
      setError('No se pudo crear el post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="p-6">
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-md shadow-md dark:bg-gray-900">
          <h2 className="text-xl font-bold">Creación de Posts</h2>
          <Link
            to="/home"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
          >
            <XVIcon icon={FontAwesomeIconsLibrary.ArrowLeft} />
            Volver
          </Link>
        </nav>

        <div className="max-w-lg mx-auto mt-8 bg-white p-8 rounded-xl shadow-lg dark:bg-gray-800 dark:shadow-none">
          <h2 className="text-3xl font-bold text-teal-600 mb-2 text-center">Crear nuevo post</h2>
          <p className="text-gray-500 text-center mb-6 dark:text-gray-300">
            Comparte tus ideas con la comunidad
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">¡Post creado con éxito!</p>}

          <form onSubmit={handleCreate} className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                border border-gray-300 rounded-md p-3 w-full
                focus:outline-none focus:ring-2 focus:ring-teal-500
                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400
              "
              required
            />
            <textarea
              placeholder="Contenido"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="
                border border-gray-300 rounded-md p-3 w-full h-32
                focus:outline-none focus:ring-2 focus:ring-teal-500
                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400
              "
              required
            />
            <button
              type="submit"
              className="
                flex items-center justify-center gap-2 bg-teal-500 text-white w-full py-3 rounded-md hover:bg-teal-600 transition duration-300
              "
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              ) : (
                <>
                  <XVIcon icon={FontAwesomeIconsLibrary.Plus} />
                  Crear Post
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreatePostPage;
