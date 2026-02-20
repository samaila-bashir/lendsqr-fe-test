import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import FilterPanel, { DEFAULT_FILTERS } from './index';

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  filters: { ...DEFAULT_FILTERS },
  onFiltersChange: vi.fn(),
  onApply: vi.fn(),
  organizations: ['Org A', 'Org B'],
};

describe('FilterPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when isOpen is false', () => {
    render(<FilterPanel {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('heading', { name: 'Filter' })).not.toBeInTheDocument();
  });

  it('renders panel with title and form fields when isOpen', () => {
    render(<FilterPanel {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'Filter', level: 2 })).toBeInTheDocument();
    expect(screen.getByLabelText('Organization')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();
  });

  it('renders organization options', () => {
    render(<FilterPanel {...defaultProps} />);
    expect(screen.getByRole('option', { name: 'Org A' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Org B' })).toBeInTheDocument();
  });

  it('calls onFiltersChange when organization is selected', async () => {
    render(<FilterPanel {...defaultProps} />);
    await userEvent.selectOptions(screen.getByLabelText('Organization'), 'Org A');
    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ organization: 'Org A' })
    );
  });

  it('calls onFiltersChange when username is typed', async () => {
    render(<FilterPanel {...defaultProps} />);
    await userEvent.type(screen.getByPlaceholderText('User'), 'jane');
    expect(defaultProps.onFiltersChange).toHaveBeenCalledTimes(4);
    expect(defaultProps.onFiltersChange).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ username: 'j' })
    );
  });

  it('calls onFiltersChange when status is selected', async () => {
    render(<FilterPanel {...defaultProps} />);
    await userEvent.selectOptions(screen.getByLabelText('Status'), 'active');
    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'active' })
    );
  });

  it('calls onApply when Filter button is clicked', async () => {
    render(<FilterPanel {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Filter' }));
    expect(defaultProps.onApply).toHaveBeenCalledTimes(1);
  });

  it('calls onFiltersChange with DEFAULT_FILTERS and onApply when Reset is clicked', async () => {
    const filtersWithValues = {
      organization: 'Org A',
      username: 'jane',
      email: 'jane@test.com',
      date: '2024-01-01',
      phoneNumber: '08012345678',
      status: 'active',
    };
    render(
      <FilterPanel {...defaultProps} filters={filtersWithValues} />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith({ ...DEFAULT_FILTERS });
    expect(defaultProps.onApply).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', async () => {
    render(<FilterPanel {...defaultProps} />);
    const overlay = document.querySelector('[aria-hidden]');
    if (overlay) await userEvent.click(overlay as HTMLElement);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when mousedown occurs outside the panel', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <FilterPanel {...defaultProps} />
      </div>
    );
    const outside = screen.getByTestId('outside');
    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
