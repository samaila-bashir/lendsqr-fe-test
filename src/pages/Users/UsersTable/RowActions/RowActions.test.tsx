import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import RowActions from './index';

const mockUser: UserTypes.User = {
  id: '1',
  organization: 'Org',
  username: 'jane',
  email: 'jane@example.com',
  phoneNumber: '08012345678',
  dateJoined: '2024-01-15',
  status: 'active',
};

const defaultProps = {
  user: mockUser,
  onClose: vi.fn(),
  onViewDetails: vi.fn(),
  onBlacklist: vi.fn(),
  onActivate: vi.fn(),
};

describe('RowActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders menu with View Details, Blacklist User, Activate User', () => {
    render(<RowActions {...defaultProps} />);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /View Details/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Blacklist User/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Activate User/i })).toBeInTheDocument();
  });

  it('calls onViewDetails and onClose when View Details is clicked', async () => {
    render(<RowActions {...defaultProps} />);
    await userEvent.click(screen.getByRole('menuitem', { name: /View Details/i }));
    expect(defaultProps.onViewDetails).toHaveBeenCalledWith(mockUser);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onBlacklist and onClose when Blacklist User is clicked', async () => {
    render(<RowActions {...defaultProps} />);
    await userEvent.click(screen.getByRole('menuitem', { name: /Blacklist User/i }));
    expect(defaultProps.onBlacklist).toHaveBeenCalledWith(mockUser);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onActivate and onClose when Activate User is clicked', async () => {
    render(<RowActions {...defaultProps} />);
    await userEvent.click(screen.getByRole('menuitem', { name: /Activate User/i }));
    expect(defaultProps.onActivate).toHaveBeenCalledWith(mockUser);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
