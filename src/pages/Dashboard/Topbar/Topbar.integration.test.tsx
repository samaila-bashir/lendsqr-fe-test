import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/usersSlice';
import Topbar from './index';

function createIntegrationStore(preloadedState?: {
  auth?: { isAuthenticated?: boolean; user?: { name?: string; email?: string; avatarUrl?: string } | null };
  users?: { searchQuery?: string; list?: unknown[]; loadStatus?: string; loadProgress?: number; error?: string | null };
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

describe('Topbar (integration)', () => {
  it('renders Lendsqr logo', () => {
    const store = createIntegrationStore();
    render(
      <Provider store={store}>
        <Topbar onToggle={() => {}} />
      </Provider>
    );
    expect(screen.getByRole('img', { name: 'Lendsqr logo' })).toBeInTheDocument();
  });

  it('calls onToggle when hamburger button is clicked', async () => {
    const onToggle = vi.fn();
    const store = createIntegrationStore();
    render(
      <Provider store={store}>
        <Topbar onToggle={onToggle} />
      </Provider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('renders SearchBar', () => {
    const store = createIntegrationStore();
    render(
      <Provider store={store}>
        <Topbar onToggle={() => {}} />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Search for anything')).toBeInTheDocument();
  });

  it('renders user name from auth state', () => {
    const store = createIntegrationStore({
      auth: {
        isAuthenticated: true,
        user: { name: 'Alex Smith', email: 'alex@test.com', avatarUrl: 'https://example.com/avatar.png' },
      },
    });
    render(
      <Provider store={store}>
        <Topbar onToggle={() => {}} />
      </Provider>
    );
    expect(screen.getByText('Alex Smith')).toBeInTheDocument();
  });

  it('renders "User" when no user in auth state', () => {
    const store = createIntegrationStore({
      auth: { isAuthenticated: false, user: null },
    });
    render(
      <Provider store={store}>
        <Topbar onToggle={() => {}} />
      </Provider>
    );
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('renders Docs and notification area', () => {
    const store = createIntegrationStore();
    render(
      <Provider store={store}>
        <Topbar onToggle={() => {}} />
      </Provider>
    );
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Notification Bell' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Avatar' })).toBeInTheDocument();
  });
});
