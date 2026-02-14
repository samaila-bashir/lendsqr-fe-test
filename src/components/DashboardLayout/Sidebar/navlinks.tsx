import {
  Briefcase,
  Handshake,
  Home,
  Loan,
  PiggyBank,
  Sack,
  UserCheck,
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
    id: 'karma',
    label: 'Karma',
    icon: UserTimes,
  },
];

export default navLinks;
