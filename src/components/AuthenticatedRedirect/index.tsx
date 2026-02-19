import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AuthenticatedRedirectProps {
  children: ReactNode;
}

const AuthenticatedRedirect = ({ children }: AuthenticatedRedirectProps) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (isAuthenticated && pathname === '/') {
    return <Navigate to="/users" replace />;
  }

  return <>{children}</>;
};

export default AuthenticatedRedirect;
