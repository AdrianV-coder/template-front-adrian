import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../store/userSlice';
import { login as authLogin } from '../store/authSlice';
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation('auth');

  useEffect(() => {
    if (user) navigate('/home');
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authenticatedUser = await dispatch(loginUser(username)).unwrap();

      dispatch(authLogin(authenticatedUser));

      navigate('/home', { replace: true });
    } catch {
      alert(t('login.cannotLogin'));
    }
  };

  return (
    
<div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100 flex items-center justify-center p-6">
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-teal-600 mb-1">{t('login.title')}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{t('login.subtitle')}</p>

      {error && (
        <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder={t('login.usernamePlaceholder')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          required
        />
        <input
          type="password"
          placeholder={t('login.passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-teal-500 text-white w-full py-3 rounded-md hover:bg-teal-600 transition duration-300"
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
          ) : (
            <>
              <XVIcon icon={FontAwesomeIconsLibrary.ArrowRight} />
              {t('login.submit')}
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
        {t('login.noAccount')}{' '}
        <Link to="/register" className="text-teal-600 hover:text-teal-700 font-medium">
          {t('login.register')}
        </Link>
           </div>
    </div>
  </div>

  );
}

export default LoginPage;
