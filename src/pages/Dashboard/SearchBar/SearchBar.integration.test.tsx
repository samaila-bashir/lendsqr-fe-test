import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/usersSlice';
import SearchBar from './index';

function createIntegrationStore(preloadedState?: {
  users?: { searchQuery?: string; list?: unknown[]; loadStatus?: string; loadProgress?: number; error?: string | null };
  auth?: { isAuthenticated?: boolean; user?: unknown };
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

describe('SearchBar (integration)', () => {
  it('renders search input with initial query from store', () => {
    const store = createIntegrationStore({
      users: { searchQuery: 'hello', list: [], loadStatus: 'idle', loadProgress: 0, error: null },
    });
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search for anything');
    expect(input).toHaveValue('hello');
  });

  it('typing updates only the input draft, not the store', async () => {
    const store = createIntegrationStore({
      users: { searchQuery: '', list: [], loadStatus: 'idle', loadProgress: 0, error: null },
    });
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search for anything');
    await userEvent.type(input, 'filter me');
    expect(store.getState().users.searchQuery).toBe('');
    expect(input).toHaveValue('filter me');
  });

  it('search button click updates store with current input value', async () => {
    const store = createIntegrationStore({
      users: { searchQuery: '', list: [], loadStatus: 'idle', loadProgress: 0, error: null },
    });
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search for anything');
    await userEvent.type(input, 'sab');
    expect(store.getState().users.searchQuery).toBe('');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(store.getState().users.searchQuery).toBe('sab');
    expect(input).toHaveValue('sab');
  });

  it('renders search button with accessible label', () => {
    const store = createIntegrationStore();
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('search runs only when search button is clicked, not on typing', async () => {
    const store = createIntegrationStore({
      users: { searchQuery: '', list: [], loadStatus: 'idle', loadProgress: 0, error: null },
    });
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search for anything');
    await userEvent.type(input, 'query');
    expect(store.getState().users.searchQuery).toBe('');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(store.getState().users.searchQuery).toBe('query');
  });
});
