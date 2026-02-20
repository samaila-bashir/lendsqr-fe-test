import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/usersSlice';
import DashboardLayout from './index';

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

function renderDashboard(initialPath = '/users') {
  const store = createIntegrationStore();
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/users" element={<DashboardLayout />}>
              <Route index element={<div data-testid="outlet-content">Users page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe('DashboardLayout (integration)', () => {
  it('renders Topbar with SearchBar', () => {
    renderDashboard();
    expect(screen.getByPlaceholderText('Search for anything')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('renders Sidebar with nav links', () => {
    renderDashboard();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('renders Outlet content for nested route', () => {
    renderDashboard();
    expect(screen.getByTestId('outlet-content')).toBeInTheDocument();
    expect(screen.getByText('Users page')).toBeInTheDocument();
  });

  it('hamburger opens sidebar and close button closes it', async () => {
    renderDashboard();
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    await userEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.getByText('Users page')).toBeInTheDocument();
  });
});
