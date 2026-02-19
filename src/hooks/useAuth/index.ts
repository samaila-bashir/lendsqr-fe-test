import type { RootState } from '@/store';
import { shallowEqual, useSelector } from 'react-redux';

export function useAuth() {
  const auth = useSelector((s: RootState) => s.auth, shallowEqual);
  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
  };
}
