import { useEffect, useState } from 'react';
import { NavbarDefault } from '../components/NavbarDefault';
import { Header } from '../components/Header';
import { getPosts } from '../services/apiService';
import type { Post } from '../types/post.type';
import CreateCommentPage from './CreateCommentPage';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const { t } = useTranslation('home');
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch {
        setError(t('errorLoadingPosts'));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [refresh, t]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
        <NavbarDefault />

        <div className="flex-1 p-6">
          {loading && (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500"></div>
            </div>
          )}

          {error && (
            <div className="text-center font-semibold text-red-600 dark:text-red-400">{error}</div>
          )}

          {!loading && !error && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-teal-600">{t('latestPosts')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 border border-transparent dark:border-gray-700"
                  >
                    <Link to={`/post/${post.id}`} state={{ post }}>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-teal-600">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{post.body}</p>
                    </Link>

                    <CreateCommentPage
                      postId={post.id}
                      onCommentCreated={() => setRefresh((prev) => prev + 1)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
