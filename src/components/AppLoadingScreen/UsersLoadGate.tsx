import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { USERS_LOAD_STATUS } from '@/constants';
import {
  selectUsersLoadProgress,
  selectUsersLoadStatus,
} from '@/store/slices/usersSlice';
import { useAuth } from '@/hooks/useAuth';
import AppLoadingScreen from './index';

export function UsersLoadGate({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const loadStatus = useSelector(selectUsersLoadStatus);
  const progress = useSelector(selectUsersLoadProgress);

  if (!isAuthenticated) return <>{children}</>;

  const loading =
    loadStatus === USERS_LOAD_STATUS.IDLE ||
    loadStatus === USERS_LOAD_STATUS.LOADING;
  if (loading) return <AppLoadingScreen progress={progress} />;

  return <>{children}</>;
}
