import { describe, it, expect } from 'vitest';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { renderWithMockRedux, screen } from '@/test/test-utils';
import AuthenticatedRedirect from './index';

const LoginContent = () => <div data-testid="login-content">Login page</div>;
const UsersContent = () => <div data-testid="users-content">Users page</div>;
const OtherContent = () => <div data-testid="other-content">Other page</div>;

function renderAt(path: string, isAuthenticated: boolean) {
  return renderWithMockRedux(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedRedirect>
              <LoginContent />
            </AuthenticatedRedirect>
          }
        />
        <Route path="/users" element={<UsersContent />} />
        <Route
          path="/other"
          element={
            <AuthenticatedRedirect>
              <OtherContent />
            </AuthenticatedRedirect>
          }
        />
      </Routes>
    </MemoryRouter>,
    {
      preloadedState: {
        auth: {
          isAuthenticated,
          user: isAuthenticated
            ? {
                name: 'Test User',
                email: 'test@example.com',
                avatarUrl: 'https://example.com/avatar.png',
              }
            : null,
        },
      },
    }
  );
}

describe('AuthenticatedRedirect', () => {
  it('redirects to /users when user is authenticated and path is /', () => {
    renderAt('/', true);

    expect(screen.getByTestId('users-content')).toBeInTheDocument();
    expect(screen.getByText('Users page')).toBeInTheDocument();
    expect(screen.queryByTestId('login-content')).not.toBeInTheDocument();
  });

  it('renders children when user is not authenticated on /', () => {
    renderAt('/', false);

    expect(screen.getByTestId('login-content')).toBeInTheDocument();
    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByTestId('users-content')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated but path is not /', () => {
    renderAt('/other', true);

    expect(screen.getByTestId('other-content')).toBeInTheDocument();
    expect(screen.getByText('Other page')).toBeInTheDocument();
  });
});
