import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import Button from './index';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders as a button element', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toBeInstanceOf(HTMLButtonElement);
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled attribute when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('merges custom className with button classes', () => {
    render(<Button className="custom-class">Label</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });

  it('applies variant class for outline', () => {
    const { container } = render(
      <Button variant="outline" className="outline-test">
        Outline
      </Button>
    );
    const button = container.querySelector('button');
    expect(button?.className).toContain('outline-test');
  });

  it('applies variant class for danger', () => {
    const { container } = render(
      <Button variant="danger" className="danger-test">
        Delete
      </Button>
    );
    const button = container.querySelector('button');
    expect(button?.className).toContain('danger-test');
  });
});
