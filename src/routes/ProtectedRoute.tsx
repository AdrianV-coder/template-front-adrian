import React, { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../store';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = !!useSelector((s: RootState) => s.auth.user);
  
  return isAuthenticated ? children : <Link to="/" replace />;
};
