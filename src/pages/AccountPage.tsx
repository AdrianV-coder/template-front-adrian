import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPostsByUsername, deletePost } from '../services/apiService';
import type { Post } from '../types/post.type';
import { Header } from '../components/Header';

function AccountPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      try {
        const data = await getPostsByUsername(user.username);
        setPosts(data);
      } catch (error) {
        console.error(error);
        alert('Error al cargar los posts');
      }
    };

    fetchPosts();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
      alert('Error eliminando el post');
    }
  };

  if (!user) return <p>No estás logueado</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="p-6">
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Posts de {user.username}</h2>

          <div className="flex gap-3 justify-center items-center">
            <button
              onClick={() => navigate('/create-post')}
              className="bg-teal-400 hover:bg-teal-600 px-4 py-2 rounded"
            >
              Crear Post
            </button>

            <button className="bg-teal-400 hover:bg-teal-600 px-4 py-2 rounded">
              <Link to="/home">Return</Link>
            </button>
          </div>
        </nav>

        {posts.length === 0 ? (
          <p>No tienes posts todavía.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="border p-4 rounded shadow">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p>{post.body}</p>

                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white mt-2"
                >
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
