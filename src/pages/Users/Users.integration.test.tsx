import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/usersSlice';
import Users from './index';

const mockUsers: UserTypes.User[] = [
  {
    id: '1',
    organization: 'Org A',
    username: 'jane_doe',
    email: 'jane@example.com',
    phoneNumber: '08012345678',
    dateJoined: '2024-01-15',
    status: 'active',
    hasLoan: true,
    hasSavings: true,
  },
  {
    id: '2',
    organization: 'Org B',
    username: 'john_smith',
    email: 'john@test.com',
    phoneNumber: '08087654321',
    dateJoined: '2023-06-20',
    status: 'inactive',
    hasLoan: false,
    hasSavings: true,
  },
  {
    id: '3',
    organization: 'Org A',
    username: 'bob_wilson',
    email: 'bob@example.com',
    phoneNumber: '08011111111',
    dateJoined: '2022-01-01',
    status: 'active',
    hasLoan: true,
    hasSavings: false,
  },
];

function createIntegrationStore(preloadedState?: {
  auth?: { isAuthenticated?: boolean; user?: { name?: string; email?: string; avatarUrl?: string } | null };
  users?: { list?: UserTypes.User[]; loadStatus?: string; loadProgress?: number; error?: string | null; searchQuery?: string };
}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
  });
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as never,
  });
}

function renderUsers(preloadedState?: { users?: { list?: UserTypes.User[] } }) {
  const store = createIntegrationStore({
    auth: { isAuthenticated: true, user: { name: 'Test', email: 'test@test.com', avatarUrl: '' } },
    users: {
      list: preloadedState?.users?.list ?? mockUsers,
      loadStatus: 'done',
      loadProgress: 100,
      error: null,
      searchQuery: '',
    },
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe('Users (integration)', () => {
  it('renders page title', () => {
    renderUsers();
    expect(screen.getByRole('heading', { name: 'Users', level: 1 })).toBeInTheDocument();
  });

  it('renders stats cards with correct labels', () => {
    renderUsers();
    const statsSection = screen.getByRole('region', { name: 'User statistics' });
    expect(within(statsSection).getByText('Users')).toBeInTheDocument();
    expect(within(statsSection).getByText('Active Users')).toBeInTheDocument();
    expect(within(statsSection).getByText('Users with Loans')).toBeInTheDocument();
    expect(within(statsSection).getByText('Users with Savings')).toBeInTheDocument();
  });

  it('displays correct stats from store', () => {
    renderUsers();
    const statsSection = screen.getByRole('region', { name: 'User statistics' });
    // mockUsers: 3 total, 2 active, 2 with loans, 2 with savings
    expect(within(statsSection).getByText('3')).toBeInTheDocument();
    expect(within(statsSection).getAllByText('2')).toHaveLength(3);
  });

  it('renders UsersTable', () => {
    renderUsers();
    expect(screen.getByText('Organization')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('displays stats correctly for different user data', () => {
    const singleUser = [mockUsers[0]]; // 1 total, 1 active, 1 with loan, 1 with savings
    renderUsers({ users: { list: singleUser } });
    const statsSection = screen.getByRole('region', { name: 'User statistics' });
    expect(within(statsSection).getAllByText('1')).toHaveLength(4);
  });
});
