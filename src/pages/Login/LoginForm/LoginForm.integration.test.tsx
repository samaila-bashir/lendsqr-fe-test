import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/usersSlice';
import LoginForm from './index';

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

function renderLoginForm(initialPath = '/') {
  const store = createIntegrationStore();
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/users" element={<div data-testid="users-page">Users page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe('LoginForm (integration)', () => {
  it('renders form with email, password, submit button and Forgot Password link', () => {
    renderLoginForm();
    expect(screen.getByRole('heading', { name: 'Welcome!' })).toBeInTheDocument();
    expect(screen.getByText('Enter details to login.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Forgot Password?' })).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    renderLoginForm();
    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'invalid');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    const form = emailInput.closest('form');
    if (form) form.setAttribute('novalidate', '');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('shows validation error for short password', async () => {
    renderLoginForm();
    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'short');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument();
  });

  it('on valid submit dispatches setUser and navigates to /users', async () => {
    const { store } = renderLoginForm();
    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(store.getState().auth.isAuthenticated).toBe(true);
    expect(store.getState().auth.user?.email).toBe('user@example.com');
    expect(store.getState().auth.user?.name).toBeDefined();
    expect(store.getState().auth.user?.avatarUrl).toBeDefined();
    expect(screen.getByTestId('users-page')).toBeInTheDocument();
    expect(screen.getByText('Users page')).toBeInTheDocument();
  });
});
