import {
  BadgePercent,
  Bank,
  Briefcase,
  ChartBar,
  ClipboardList,
  Coins,
  Galaxy,
  Handshake,
  Home,
  Loan,
  PiggyBank,
  Sack,
  Scroll,
  Sliders,
  Tire,
  Transactions,
  UserCheck,
  UserCog,
  UserFriends,
  Users,
  UserTimes,
} from '@/assets/images';

interface NavlinksProps {
  id?: string;
  label: string;
  icon?: string;
  hasDropdown?: boolean;
  type?: string;
  active?: boolean;
}

const navLinks: NavlinksProps[] = [
  {
    id: 'switch',
    label: 'Switch Organization',
    icon: Briefcase,
    hasDropdown: true,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    type: 'header',
    label: 'CUSTOMERS',
  },
  {
    id: 'users',
    label: 'Users',
    icon: UserFriends,
    active: true,
  },
  {
    id: 'guarantors',
    label: 'Guarantors',
    icon: Users,
  },
  {
    id: 'loans',
    label: 'Loans',
    icon: Sack,
  },
  {
    id: 'decision-models',
    label: 'Decision Models',
    icon: Handshake,
  },
  {
    id: 'savings',
    label: 'Savings',
    icon: PiggyBank,
  },
  {
    id: 'loan',
    label: 'Loan Request',
    icon: Loan,
  },
  {
    id: 'whitelist',
    label: 'WhiteList',
    icon: UserCheck,
  },
  {
    id: 'karma',
    label: 'Karma',
    icon: UserTimes,
  },
  {
    type: 'header',
    label: 'BUSINESSES',
  },
  {
    id: 'organization',
    label: 'Organization',
    icon: Briefcase,
  },
  {
    id: 'loan-products',
    label: 'Loan Products',
    icon: Loan,
  },
  {
    id: 'savings-products',
    label: 'Savings Products',
    icon: Bank,
  },
  {
    id: 'fees-and-charges',
    label: 'Fees and Charges',
    icon: Coins,
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: Transactions,
  },
  {
    id: 'services',
    label: 'Services',
    icon: Galaxy,
  },
  {
    id: 'service-account',
    label: 'Service Account',
    icon: UserCog,
  },
  {
    id: 'settlements',
    label: 'Settlements',
    icon: Scroll,
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: ChartBar,
  },
  {
    type: 'header',
    label: 'SETTINGS',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: Sliders,
  },
  {
    id: 'fees-and-pricing',
    label: 'Fees and Pricing',
    icon: BadgePercent,
  },
  {
    id: 'audit-logs',
    label: 'Audit Logs',
    icon: ClipboardList,
  },
  {
    id: 'systems-messages',
    label: 'Systems Messages',
    icon: Tire,
  },
];

export default navLinks;
