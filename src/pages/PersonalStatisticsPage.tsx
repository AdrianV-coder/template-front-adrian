import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsReact from 'highcharts-react-official';
import { Link } from 'react-router-dom';
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { getPostsByUsername, getComments, getCommentsByPostId } from '../services/apiService';
import type { Post } from '../types/post.type';
import type { Comment } from '../types/comment.type';
import { useTranslation } from 'react-i18next';

function PersonalStatisticsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [commentsReceivedCount, setCommentsReceivedCount] = useState<number>(0);
  const [commentsWrittenCount, setCommentsWrittenCount] = useState<number>(0);
  const { t } = useTranslation(['personalStatistics', 'common']);

  const [isDark] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  });

  if (typeof HighchartsAccessibility === 'function') {
    HighchartsAccessibility(Highcharts);
  }

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setError(t('errorLoadingStats'));
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const posts: Post[] = await getPostsByUsername(user.username);
        setPostsCount(posts.length);

        const allComments: Comment[] = await getComments();
        
        const received: Comment[] = [];
        for (const p of posts) {
          const postComments = await getCommentsByPostId(p.id);
          received.push(...postComments);
        }
        setCommentsReceivedCount(received.length);

        const written = allComments.filter(c => c.userId === user.id);
        setCommentsWrittenCount(written.length);
      } catch (e: any) {
        setError(e?.message ?? t('errorLoadingStats'));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, t]);

  const chartOptions: Highcharts.Options = {
    chart: { type: 'bar', backgroundColor: isDark ? '#1f2937' : '#ffffff' },
    title: { text: t('chartTitle', { username: user?.username ?? '' }), style: { color: isDark ? '#e5e7eb' : '#1f2937' } },
    subtitle: { text: t('chartSubtitle') },
    xAxis: {
      categories: [t('xPosts'), t('xReceived'), t('xWritten')],
      title: { text: undefined },
      labels: { style: { color: isDark ? '#e5e7eb' : '#1f2937' } },
    },
    yAxis: {
      min: 0,
      title: { text: t('yTitle') },
      allowDecimals: false,
      labels: { style: { color: isDark ? '#e5e7eb' : '#1f2937' } },
    },
    tooltip: {
      pointFormat: '<b>{point.y}</b>',
    },
    series: [
      {
        name: 'Cantidad',
        type: 'bar',
        data: [postsCount, commentsReceivedCount, commentsWrittenCount],
        colorByPoint: true,
      },
    ],
    colors: ['#14b8a6', '#6366f1', '#f59e0b'],
    credits: { enabled: false },
    legend: { enabled: false },
    accessibility: {
      enabled: true,
      description: t('chartDescription'),
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="p-6">
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-md shadow-md dark:bg-gray-900">
          <h2 className="text-xl font-bold">{t('title')}</h2>
          <Link
            to="/home"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition duration-300"
          >
            <XVIcon icon={FontAwesomeIconsLibrary.ArrowLeft} />
            {t('back', { ns: 'common' })}
          </Link>
        </nav>

        <section className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800 dark:shadow-none">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">{t('panelTitle')}</h2>
          <p className="text-gray-500 mb-4 dark:text-gray-300">{t('panelSubtitle')}</p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-gray-600 dark:text-gray-300">{t('loadingStats')}</div>
          ) : (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          )}
        </section>
      </main>
    </div>
  );
}

export default PersonalStatisticsPage;
