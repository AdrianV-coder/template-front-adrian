import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { NavbarDefault } from '../components/NavbarDefault';
import { getCommentsByPostId } from '../services/apiService';
import type { Post } from '../types/post.type';
import type { Comment } from '../types/comment.type';
import CreateCommentPage from './CreateCommentPage';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const post = location.state?.post as Post | undefined;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByPostId(id!);
        setComments(commentsData);
      } catch (err) {
        console.error('Error cargando comentarios', err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [id, refresh]);

  if (!post) return <div className="text-center mt-10">Post no encontrado</div>;
  if (loading) return <div className="text-center mt-10">Cargando comentarios...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <NavbarDefault />
      <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <Link
            to="/home"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded text-white transition duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Volver
          </Link>
        </div>

        <p className="text-gray-700 mb-6">{post.body}</p>

        <CreateCommentPage
          postId={post.id}
          onCommentCreated={() => setRefresh((prev) => prev + 1)}
        />

        <h2 className="text-xl font-semibold mt-6 mb-4">Comentarios</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">No hay comentarios aún.</p>
        ) : (
          <ul className="space-y-3">
            {comments.map((c) => (
              <li key={c.id} className="border rounded p-3">
                <p className="font-semibold">{c.name}</p>
                <p className="text-gray-600">{c.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PostDetailPage;
