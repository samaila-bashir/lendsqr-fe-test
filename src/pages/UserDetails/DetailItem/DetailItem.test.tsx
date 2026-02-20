import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import DetailItem from './index';

describe('DetailItem', () => {
  it('renders label and value', () => {
    render(<DetailItem label="Full Name" value="John Doe" />);
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders different label-value pairs', () => {
    render(<DetailItem label="Email" value="user@example.com" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
  });

  it('renders long value text', () => {
    const longValue =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.';
    render(<DetailItem label="Description" value={longValue} />);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText(longValue)).toBeInTheDocument();
  });
});
