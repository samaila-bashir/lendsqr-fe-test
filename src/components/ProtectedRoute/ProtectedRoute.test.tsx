import { describe, it, expect } from 'vitest';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { renderWithMockRedux, screen } from '@/test/test-utils';
import ProtectedRoute from './index';

const HomeContent = () => <div data-testid="home-content">Home page</div>;
const ProtectedContent = () => (
  <div data-testid="protected-content">Protected page</div>
);

function renderAt(path: string, isAuthenticated: boolean) {
  return renderWithMockRedux(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <ProtectedContent />
            </ProtectedRoute>
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

describe('ProtectedRoute', () => {
  it('redirects to / when user is not authenticated', () => {
    renderAt('/users', false);

    expect(screen.getByTestId('home-content')).toBeInTheDocument();
    expect(screen.getByText('Home page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    renderAt('/users', true);

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Protected page')).toBeInTheDocument();
    expect(screen.queryByTestId('home-content')).not.toBeInTheDocument();
  });
});
