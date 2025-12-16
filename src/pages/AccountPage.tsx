import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPostsByUsername, deletePost } from '../services/apiService';
import type { Post } from '../types/post.type';
import { Header } from '../components/Header';
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";
import type { RootState } from '../store/index';

function AccountPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
      try {
        const data = await getPostsByUsername(user.username);
        setPosts(data);
      } catch {
        setError('Error al cargar los posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch {
      setError('Error eliminando el post');
    }
  };

  if (!user) return <p className="text-center mt-10 text-red-500">No estás logueado</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <div className="p-6">
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-md shadow-md dark:bg-gray-900">
          <h2 className="text-xl font-bold">Posts de {user.username}</h2>
          <div className="flex gap-3">
            <Link
              to="/personalStatistics"
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
            >
              <XVIcon icon={FontAwesomeIconsLibrary.ChartLine} />
              Personal Statistics
            </Link>
            <Link
              to="/create-post"
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
            >
              <XVIcon icon={FontAwesomeIconsLibrary.Plus} />
              Crear Post
            </Link>
            <Link
              to="/home"
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
            >
              <XVIcon icon={FontAwesomeIconsLibrary.ArrowLeft} />
              Volver
            </Link>
          </div>
        </nav>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-500"></div>
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-300 mt-6">No tienes posts todavía.</p>
        )}

        {!loading && posts.length > 0 && (
          <ul className="space-y-4 mt-6">
            {posts.map((post) => (
              <li key={post.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4">
                <Link to={`/post/${post.id}`} state={{ post }}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-teal-600">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
                </Link>

                <button
                  onClick={() => handleDelete(post.id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white mt-4 transition duration-300"
                >
                  <XVIcon icon={FontAwesomeIconsLibrary.TrashRegular} />
                  Eliminar Post
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
