import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import TableFilterForm from './index';
import { DEFAULT_FILTERS } from '../FilterPanel';

const defaultProps = {
  filters: { ...DEFAULT_FILTERS },
  onFiltersChange: vi.fn(),
  organizations: ['Org A', 'Org B'],
  dateDisplayValue: '',
  onDateChange: vi.fn(),
  onReset: vi.fn(),
  onFilter: vi.fn(),
};

describe('TableFilterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<TableFilterForm {...defaultProps} />);
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
    render(<TableFilterForm {...defaultProps} />);
    expect(screen.getByRole('option', { name: 'Org A' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Org B' })).toBeInTheDocument();
  });

  it('calls onFiltersChange when organization is selected', async () => {
    render(<TableFilterForm {...defaultProps} />);
    await userEvent.selectOptions(screen.getByLabelText('Organization'), 'Org A');
    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ organization: 'Org A' })
    );
  });

  it('calls onDateChange when date input changes', async () => {
    render(<TableFilterForm {...defaultProps} />);
    await userEvent.type(screen.getByLabelText('Date'), '15/01/2024');
    expect(defaultProps.onDateChange).toHaveBeenCalled();
  });

  it('calls onReset when Reset is clicked', async () => {
    render(<TableFilterForm {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(defaultProps.onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onFilter when Filter is clicked', async () => {
    render(<TableFilterForm {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Filter' }));
    expect(defaultProps.onFilter).toHaveBeenCalledTimes(1);
  });
});
