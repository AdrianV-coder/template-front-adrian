import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { NavbarDefault } from '../components/NavbarDefault';
import { getCommentsByPostId } from '../services/apiService';
import type { Post } from '../types/post.type';
import type { Comment } from '../types/comment.type';
import CreateCommentPage from './CreateCommentPage';
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";
import { useTranslation } from 'react-i18next';

function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const post = (location.state?.post as Post | undefined);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const { t } = useTranslation(['postDetail', 'common']);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByPostId(id!);
        setComments(commentsData);
      } catch (err: any) {
        setError(err?.message ?? 'Error cargando comentarios');
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [id, refresh]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
        <Header />
        <NavbarDefault />
        <main className="p-6 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p data-testid="post-not-found"className="text-red-600 dark:text-red-400">{t('postNotFound')}</p>
            <Link
              to="/home"
              className="inline-flex items-center gap-2 mt-3 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded text-white transition"
            >
              <XVIcon icon={FontAwesomeIconsLibrary.ArrowLeft} />
              {t('back', { ns: 'common' })}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
        <Header />
        <NavbarDefault />
        <main className="p-6 max-w-3xl mx-auto">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-500"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) return <div data-testid="post-not-found" className="text-center font-semibold text-red-600 dark:text-red-400">{error}</div>

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <NavbarDefault />

      <main className="p-6 max-w-3xl mx-auto">
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-md shadow-md dark:bg-gray-900">
          <h2 data-testid="post-detail" className="text-xl font-bold">{t('postDetail')}</h2>
          <Link
            to="/home"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
          >
            <XVIcon icon={FontAwesomeIconsLibrary.ArrowLeft} />
            {t('back', { ns: 'common' })}
          </Link>
        </nav>

        <article className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4">
          <h4 data-testid="post-title" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{post.title}</h4>
          <p data-testid="post-body" className="text-gray-700 dark:text-gray-300">{post.body}</p>
        </article>

        <section className="mt-6">
          <CreateCommentPage postId={id!} onCommentCreated={() => setRefresh((prev) => prev + 1)} />
        </section>

        <section className="mt-6">
          <h4 className="text-xl font-bold mb-3">{t('comments')}</h4>

          {comments.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">{t('noComments')}</p>
          ) : (
            <ul data-testid="comments-list" className="space-y-3">
              {comments.map((c) => (
                <li
                  key={c.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{c.name}</p>
                  <p className="text-gray-700 dark:text-gray-300">{c.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default PostDetailPage;