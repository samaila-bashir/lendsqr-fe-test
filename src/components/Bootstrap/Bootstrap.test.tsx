import { describe, it, expect } from 'vitest';
import { renderWithMockRedux, screen } from '@/test/test-utils';
import { loadUsersRequest } from '@/store/slices/usersSlice';
import Bootstrap from './index';

describe('Bootstrap', () => {
  it('renders children', () => {
    renderWithMockRedux(
      <Bootstrap>
        <span data-testid="child">App content</span>
      </Bootstrap>,
      {
        preloadedState: {
          auth: { isAuthenticated: false, user: null },
        },
      }
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('App content')).toBeInTheDocument();
  });

  it('dispatches loadUsersRequest when authenticated', () => {
    const { getActions } = renderWithMockRedux(
      <Bootstrap>
        <span>Child</span>
      </Bootstrap>,
      {
        preloadedState: {
          auth: {
            isAuthenticated: true,
            user: {
              name: 'Test User',
              email: 'test@example.com',
              avatarUrl: 'https://example.com/avatar.png',
            },
          },
        },
      }
    );

    expect(getActions()).toContainEqual(
      expect.objectContaining({ type: loadUsersRequest.type })
    );
  });

  it('does not dispatch loadUsersRequest when not authenticated', () => {
    const { getActions } = renderWithMockRedux(
      <Bootstrap>
        <span>Child</span>
      </Bootstrap>,
      {
        preloadedState: {
          auth: { isAuthenticated: false, user: null },
        },
      }
    );

    const loadRequestActions = getActions().filter(
      (a) => a.type === loadUsersRequest.type
    );
    expect(loadRequestActions).toHaveLength(0);
  });
});
