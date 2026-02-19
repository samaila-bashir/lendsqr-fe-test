/* eslint-disable @typescript-eslint/no-namespace -- intentional for global type augmentation */
declare global {
  namespace UserTypes {
    type UserStatus = 'active' | 'inactive' | 'pending' | 'blacklisted';

    interface User {
      id: string;
      organization: string;
      username: string;
      email: string;
      phoneNumber: string;
      dateJoined: string;
      status: UserStatus;
      hasLoan?: boolean;
      hasSavings?: boolean;
    }

    interface Guarantor {
      fullName: string;
      phone: string;
      email: string;
      relationship: string;
    }

    interface DetailItem {
      label: string;
      value: string;
    }

    interface UserDetails {
      personalInformation: DetailItem[];
      educationAndEmployment: DetailItem[];
      socials: DetailItem[];
      guarantors: Guarantor[];
    }
  }
}
