import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import type { RootState } from '../store';

interface Props {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = !!useSelector((s: RootState) => s.auth.user);
  const location = useLocation();

  return isAuthenticated ? children : <Navigate to="/" replace state={{ from: location }} />;
}