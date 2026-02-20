import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import GuarantorSection from './index';

const mockGuarantors: UserTypes.Guarantor[] = [
  {
    fullName: 'Jane Smith',
    phone: '08012345678',
    email: 'jane@example.com',
    relationship: 'Sister',
  },
  {
    fullName: 'John Doe',
    phone: '08087654321',
    email: 'john@example.com',
    relationship: 'Brother',
  },
];

describe('GuarantorSection (integration)', () => {
  it('renders section title', () => {
    render(<GuarantorSection guarantors={mockGuarantors} />);
    expect(screen.getByRole('heading', { name: 'Guarantor', level: 3 })).toBeInTheDocument();
  });

  it('renders all guarantors with their details via DetailItem', () => {
    render(<GuarantorSection guarantors={mockGuarantors} />);

    expect(screen.getAllByText('full Name')).toHaveLength(2);
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('08012345678')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sister')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('08087654321')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Brother')).toBeInTheDocument();
  });

  it('renders single guarantor', () => {
    render(<GuarantorSection guarantors={[mockGuarantors[0]]} />);
    expect(screen.getByText('Guarantor')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('renders section with empty guarantors array', () => {
    render(<GuarantorSection guarantors={[]} />);
    expect(screen.getByRole('heading', { name: 'Guarantor', level: 3 })).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });
});
