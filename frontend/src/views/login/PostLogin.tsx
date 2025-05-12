import { Navigate } from 'react-router-dom';
import React, { JSX } from 'react';

interface AuthProps {
    children: JSX.Element;
    isAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<AuthProps> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};