import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import DashboardLayout from '@/pages/Dashboard';
import Users from '@/pages/Users';
import UserDetails from '@/pages/UserDetails';

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Users /> },
      { path: 'details/:userId', element: <UserDetails /> },
    ],
  },
];
