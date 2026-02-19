import { useEffect, type ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { loadUsersRequest } from '@/store/slices/usersSlice';
import { useAuth } from '@/hooks/useAuth';

function Bootstrap({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUsersRequest());
    }
  }, [dispatch, isAuthenticated]);

  return <>{children}</>;
}

export default Bootstrap;
