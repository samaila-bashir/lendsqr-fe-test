import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/usersSlice';
import Sidebar from './index';

function createIntegrationStore(preloadedState?: {
  auth?: { isAuthenticated?: boolean; user?: { name?: string; email?: string; avatarUrl?: string } | null };
  users?: { list?: unknown[]; loadStatus?: string; loadProgress?: number; error?: string | null; searchQuery?: string };
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

describe('Sidebar (integration)', () => {
  it('renders user name from auth state', () => {
    const store = createIntegrationStore({
      auth: {
        isAuthenticated: true,
        user: { name: 'Jane Doe', email: 'jane@test.com', avatarUrl: 'https://example.com/avatar.png' },
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders "User" when no user in auth state', () => {
    const store = createIntegrationStore({
      auth: { isAuthenticated: false, user: null },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const store = createIntegrationStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar isOpen={true} onClose={onClose} />
        </MemoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders nav links and logout', () => {
    const store = createIntegrationStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('CUSTOMERS')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByText('v1.2.0')).toBeInTheDocument();
  });

  it('on logout dispatches clearAuth and clearUsers then navigates to /', async () => {
    const store = createIntegrationStore({
      auth: {
        isAuthenticated: true,
        user: { name: 'Test', email: 'test@test.com', avatarUrl: 'https://x.com/a.png' },
      },
      users: {
        list: [{ id: '1', organization: 'Org', username: 'u', email: 'e@e.com', phoneNumber: '0', dateJoined: '', status: 'active' }],
        loadStatus: 'done',
        loadProgress: 100,
        error: null,
        searchQuery: '',
      },
    });
    const HomePage = () => <div>Home page</div>;
    const DashboardPage = () => <div>Dashboard</div>;
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/users']}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<DashboardPage />} />
          </Routes>
          <Sidebar isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(store.getState().auth.isAuthenticated).toBe(false);
    expect(store.getState().auth.user).toBeNull();
    expect(store.getState().users.list).toEqual([]);
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
