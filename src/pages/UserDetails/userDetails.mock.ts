import { faker } from '@faker-js/faker';
export interface UserDetailsSummary {
  fullName: string;
  id: string;
  tierCount: number;
  amount: string;
  bankAccount: string;
}

export interface DetailSection {
  title: string;
  data: { label: string; value: string }[];
}

function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function seedFromUserId(userId: string): number {
  const match = userId.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export function generateUserDetailsFromFaker(user?: UserTypes.User): {
  summary: UserDetailsSummary;
  sections: DetailSection[];
  guarantors: UserTypes.Guarantor[];
} {
  if (user) faker.seed(seedFromUserId(user.id));
  const fullName = user?.username ?? faker.person.fullName();
  const bvn = '0' + faker.string.numeric(10);
  const phone = user?.phoneNumber ?? '0' + faker.string.numeric(10);
  const email = user?.email ?? faker.internet.email();
  const gender = faker.helpers.arrayElement(['Female', 'Male', 'Non-binary']);
  const maritalStatus = faker.helpers.arrayElement(['Single', 'Married', 'Divorced', 'Widowed']);
  const children = faker.helpers.arrayElement(['None', '1', '2', '3', '4+']);
  const residence = faker.helpers.arrayElement(["Parent's Apartment", 'Own Apartment', 'Rented', 'With Spouse']);
  const education = faker.helpers.arrayElement(['B.Sc', 'M.Sc', 'HND', 'OND', 'SSCE', 'PhD']);
  const employmentStatus = faker.helpers.arrayElement(['Employed', 'Self-employed', 'Unemployed', 'Student']);
  const sector = faker.helpers.arrayElement(['FinTech', 'EdTech', 'Health', 'Agriculture', 'Government']);
  const duration = faker.helpers.arrayElement(['1 year', '2 years', '3 years', '5 years', '6 months']);
  const officeEmail = faker.internet.email();
  const incomeRange = faker.helpers.arrayElement([
    '₦200,000.00 - ₦400,000.00',
    '₦100,000.00 - ₦200,000.00',
    '₦400,000.00 - ₦600,000.00',
  ]);
  const loanRepayment = faker.number.int({ min: 20000, max: 100000 }).toLocaleString('en-NG');
  const twitter = '@' + faker.internet.userName().toLowerCase().replace(/\s/g, '');
  const facebook = faker.person.fullName();
  const instagram = '@' + faker.internet.userName().toLowerCase().replace(/\s/g, '');

  const summary: UserDetailsSummary = {
    fullName,
    id: user?.id ?? 'LSQ' + faker.string.alpha({ length: 7, casing: 'mixed' }) + faker.string.numeric(2),
    tierCount: faker.number.int({ min: 1, max: 3 }),
    amount: formatCurrency(faker.number.float({ min: 50000, max: 500000, fractionDigits: 2 })),
    bankAccount: faker.string.numeric(10) + '/' + faker.helpers.arrayElement(['Providus Bank', 'GTBank', 'Access Bank', 'Zenith Bank']),
  };

  const sections: DetailSection[] = [
    {
      title: 'Personal Information',
      data: [
        { label: 'Full Name', value: fullName },
        { label: 'Phone Number', value: phone },
        { label: 'Email Address', value: email },
        { label: 'BVN', value: bvn },
        { label: 'Gender', value: gender },
        { label: 'Marital Status', value: maritalStatus },
        { label: 'Children', value: children },
        { label: 'Type of Residence', value: residence },
      ],
    },
    {
      title: 'Education and Employment',
      data: [
        { label: 'Level of Education', value: education },
        { label: 'Employment Status', value: employmentStatus },
        { label: 'Sector of Employment', value: sector },
        { label: 'Duration of Employment', value: duration },
        { label: 'Office Email', value: officeEmail },
        { label: 'Monthly Income', value: incomeRange },
        { label: 'Loan Repayment', value: loanRepayment },
      ],
    },
    {
      title: 'Socials',
      data: [
        { label: 'Twitter', value: twitter },
        { label: 'Facebook', value: facebook },
        { label: 'Instagram', value: instagram },
      ],
    },
  ];

  const relationships = ['Sister', 'Brother', 'Father', 'Mother', 'Friend', 'Colleague', 'Spouse'];
  const guarantors: UserTypes.Guarantor[] = faker.helpers.arrayElements(
    Array.from({ length: 6 }, () => ({
      fullName: faker.person.fullName(),
      phone: '0' + faker.string.numeric(10),
      email: faker.internet.email(),
      relationship: faker.helpers.arrayElement(relationships),
    })),
    { min: 1, max: 3 }
  );

  return { summary, sections, guarantors };
}
