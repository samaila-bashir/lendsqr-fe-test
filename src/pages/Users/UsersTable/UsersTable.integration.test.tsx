import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/usersSlice';
import UsersTable from './index';

const mockUsers: UserTypes.User[] = [
  {
    id: '1',
    organization: 'Org A',
    username: 'jane_doe',
    email: 'jane@example.com',
    phoneNumber: '08012345678',
    dateJoined: '2024-01-15',
    status: 'active',
  },
  {
    id: '2',
    organization: 'Org B',
    username: 'john_smith',
    email: 'john@test.com',
    phoneNumber: '08087654321',
    dateJoined: '2023-06-20',
    status: 'inactive',
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

function renderUsersTable(preloadedState?: {
  users?: { list?: UserTypes.User[] };
}) {
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
        <MemoryRouter initialEntries={['/users']}>
          <Routes>
            <Route path="/users" element={<UsersTable />} />
            <Route path="/users/details/:userId" element={<div data-testid="user-details">User Details</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe('UsersTable (integration)', () => {
  it('renders table with column headers', () => {
    renderUsersTable();
    expect(screen.getByText('Organization')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Date Joined')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders user rows from store', () => {
    renderUsersTable();
    expect(screen.getByText('jane_doe')).toBeInTheDocument();
    expect(screen.getByText('john_smith')).toBeInTheDocument();
  });

  it('shows filter panel when filter button is clicked', async () => {
    renderUsersTable();
    const filterBtn = screen.getAllByRole('button', { name: /Show filter|Hide filter/i })[0];
    await userEvent.click(filterBtn);
    expect(screen.getByLabelText('Filter by organization')).toBeInTheDocument();
  });

  it('View Details navigates to user details page', async () => {
    renderUsersTable();
    const actionBtns = screen.getAllByRole('button', { name: 'Open actions menu' });
    await userEvent.click(actionBtns[0]);
    await userEvent.click(screen.getByRole('menuitem', { name: 'View Details' }));
    expect(screen.getByTestId('user-details')).toBeInTheDocument();
  });

  it('Blacklist User dispatches updateUserStatus', async () => {
    const { store } = renderUsersTable();
    const actionBtns = screen.getAllByRole('button', { name: 'Open actions menu' });
    await userEvent.click(actionBtns[0]);
    await userEvent.click(screen.getByRole('menuitem', { name: 'Blacklist User' }));
    const user = store.getState().users.list.find((u) => u.id === '1');
    expect(user?.status).toBe('blacklisted');
  });
});
