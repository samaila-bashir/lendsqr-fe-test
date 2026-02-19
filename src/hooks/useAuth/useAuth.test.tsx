import { describe, it, expect } from 'vitest';
import { renderWithMockRedux, screen } from '@/test/test-utils';
import { useAuth } from './index';

function TestConsumer() {
  const { isAuthenticated, user } = useAuth();
  return (
    <div>
      <span data-testid="isAuthenticated">{String(isAuthenticated)}</span>
      <span data-testid="user-email">{user?.email ?? 'null'}</span>
      <span data-testid="user-name">{user?.name ?? 'null'}</span>
    </div>
  );
}

describe('useAuth', () => {
  it('returns isAuthenticated false and user null when not authenticated', () => {
    renderWithMockRedux(<TestConsumer />, {
      preloadedState: {
        auth: { isAuthenticated: false, user: null },
      },
    });

    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user-email')).toHaveTextContent('null');
    expect(screen.getByTestId('user-name')).toHaveTextContent('null');
  });

  it('returns isAuthenticated true and user when authenticated', () => {
    const user = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatarUrl: 'https://example.com/jane.png',
    };

    renderWithMockRedux(<TestConsumer />, {
      preloadedState: {
        auth: { isAuthenticated: true, user },
      },
    });

    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('user-email')).toHaveTextContent('jane@example.com');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Jane Doe');
  });
});
