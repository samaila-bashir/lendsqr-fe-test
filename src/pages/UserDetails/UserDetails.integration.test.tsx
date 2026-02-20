import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/usersSlice';
import UserDetails from './index';

const mockUser: UserTypes.User = {
  id: 'LSQ123abc45',
  organization: 'Org',
  username: 'Jane Doe',
  email: 'jane@example.com',
  phoneNumber: '08012345678',
  dateJoined: '2024-01-15',
  status: 'active',
};

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

function renderUserDetails(
  initialPath: string,
  preloadedState?: { users?: { list?: UserTypes.User[] } }
) {
  const store = createIntegrationStore({
    auth: { isAuthenticated: true, user: { name: 'Test', email: 'test@test.com', avatarUrl: '' } },
    users: {
      list: preloadedState?.users?.list ?? [mockUser],
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
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/users" element={<div data-testid="users-page">Users page</div>} />
            <Route path="/users/details/:userId" element={<UserDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe('UserDetails (integration)', () => {
  it('shows "User not found" when user is not in store', () => {
    renderUserDetails('/users/details/nonexistent-id', {
      users: { list: [] },
    });
    expect(screen.getByText('User not found.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Users/i })).toBeInTheDocument();
  });

  it('renders user details when user exists in store', () => {
    renderUserDetails('/users/details/LSQ123abc45');

    expect(screen.getByText('User Details')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Jane Doe', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('LSQ123abc45')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Users/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Blacklist User' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Activate User' })).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    renderUserDetails('/users/details/LSQ123abc45');

    expect(screen.getByRole('button', { name: 'General Details' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Documents' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bank Details' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Loans' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Savings' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'App and System' })).toBeInTheDocument();
  });

  it('renders detail sections and Guarantor section', () => {
    renderUserDetails('/users/details/LSQ123abc45');

    expect(screen.getByRole('heading', { name: 'Personal Information', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Education and Employment', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Socials', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Guarantor', level: 3 })).toBeInTheDocument();
  });

  it('Blacklist User button dispatches updateUserStatus', async () => {
    const { store } = renderUserDetails('/users/details/LSQ123abc45');

    await userEvent.click(screen.getByRole('button', { name: 'Blacklist User' }));

    const user = store.getState().users.list.find((u) => u.id === 'LSQ123abc45');
    expect(user?.status).toBe('blacklisted');
  });

  it('Activate User button dispatches updateUserStatus', async () => {
    const { store } = renderUserDetails('/users/details/LSQ123abc45', {
      users: {
        list: [{ ...mockUser, status: 'blacklisted' }],
      },
    });

    await userEvent.click(screen.getByRole('button', { name: 'Activate User' }));

    const user = store.getState().users.list.find((u) => u.id === 'LSQ123abc45');
    expect(user?.status).toBe('active');
  });
});
