import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/usersSlice';
import Login from './index';

function createIntegrationStore(preloadedState?: {
  auth?: { isAuthenticated?: boolean; user?: unknown };
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

function renderLogin(initialPath = '/') {
  const store = createIntegrationStore();
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<div data-testid="users-page">Users page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe('Login (integration)', () => {
  it('renders logo and illustration', () => {
    renderLogin();
    expect(screen.getByAltText('Lendsqr Logo')).toBeInTheDocument();
    expect(screen.getByAltText('login-illustration')).toBeInTheDocument();
  });

  it('renders LoginForm with heading, form fields and submit button', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: 'Welcome!' })).toBeInTheDocument();
    expect(screen.getByText('Enter details to login.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Forgot Password?' })).toBeInTheDocument();
  });

  it('on valid submit dispatches setUser and navigates to /users', async () => {
    const { store } = renderLogin();
    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

    expect(store.getState().auth.isAuthenticated).toBe(true);
    expect(store.getState().auth.user?.email).toBe('user@example.com');
    expect(screen.getByTestId('users-page')).toBeInTheDocument();
    expect(screen.getByText('Users page')).toBeInTheDocument();
  });
});
