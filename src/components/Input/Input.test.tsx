import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import Input from './index';

describe('Input', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Enter value" />);
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Email" placeholder="you@example.com" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const { container } = render(<Input placeholder="Search" />);
    expect(container.querySelector('label')).not.toBeInTheDocument();
  });

  it('renders error message when error prop is provided', () => {
    render(
      <Input placeholder="Field" error="This field is required" />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders showPasswordBtn text when provided', () => {
    render(
      <Input placeholder="Password" showPasswordBtn="Show" />
    );
    expect(screen.getByText('Show')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <Input placeholder="Search" icon={<span data-testid="search-icon">🔍</span>} />
    );
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('forwards ref to the input element', () => {
    const ref = vi.fn();
    render(<Input ref={ref} placeholder="Test" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('passes through input props', () => {
    render(
      <Input
        placeholder="Name"
        type="email"
        disabled
        aria-label="Name field"
      />
    );
    const input = screen.getByPlaceholderText('Name');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-label', 'Name field');
  });

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    render(
      <Input placeholder="Search" onChange={handleChange} />
    );
    await userEvent.type(screen.getByPlaceholderText('Search'), 'a');
    expect(handleChange).toHaveBeenCalled();
  });

  it('merges custom className on the input', () => {
    render(<Input placeholder="X" className="custom-input" />);
    const input = screen.getByPlaceholderText('X');
    expect(input.className).toContain('custom-input');
  });
});
