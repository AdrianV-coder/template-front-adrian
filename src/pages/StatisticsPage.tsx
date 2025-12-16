import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsReact from 'highcharts-react-official';
import { Link } from 'react-router-dom';
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";
import { getPosts, getComments } from '../services/apiService';
import type { Post } from '../types/post.type';
import type { Comment } from '../types/comment.type';

function StatisticsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [commentsCount, setCommentsCount] = useState<number>(0);

  if (typeof HighchartsAccessibility === 'function') {
    HighchartsAccessibility(Highcharts);
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const posts: Post[] = await getPosts();
        setPostsCount(posts.length);

        const comments: Comment[] = await getComments();
        setCommentsCount(comments.length);
      } catch (e: any) {
        setError(e?.message ?? 'Error cargando estadísticas');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);
  
  const totalsOptions: Highcharts.Options = {
    chart: { type: 'bar' },
    title: { text: 'Totales: Posts y Comentarios' },
    xAxis: { categories: ['Posts', 'Comentarios'] },
    yAxis: { min: 0, title: { text: 'Cantidad' } },
    series: [
        {
          name: 'Cantidad',
          type: 'bar',
          data: [postsCount, commentsCount],
          colorByPoint: true,
        },
    ],
    colors: ['#14b8a6', '#6366f1'],
    credits: { enabled: false },
    legend: { enabled: false },
    accessibility: {
      enabled: true,
      description: 'Gráfico de barras con totales de posts y comentarios',
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="p-6">
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-md shadow-md dark:bg-gray-900">
          <h2 className="text-xl font-bold">Estadísticas</h2>
          <Link
            to="/home"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
          >
            <XVIcon icon={FontAwesomeIconsLibrary.ArrowLeft} />
            Volver
          </Link>
        </nav>

        <section className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800 dark:shadow-none">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">Totales de la plataforma</h2>
          <p className="text-gray-500 mb-4 dark:text-gray-300">Cantidad de posts y comentarios.</p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-gray-600 dark:text-gray-300">Cargando estadísticas…</div>
          ) : (
            <HighchartsReact highcharts={Highcharts} options={totalsOptions} />
          )}
        </section>
      </main>
    </div>
  );
}

export default StatisticsPage;