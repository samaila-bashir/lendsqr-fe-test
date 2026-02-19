/* eslint-disable @typescript-eslint/no-namespace -- intentional for global type augmentation */
declare global {
  namespace AuthTypes {
    interface AuthUser {
      name: string;
      email: string;
      avatarUrl: string;
    }

    interface AuthState {
      user: AuthTypes.AuthUser | null;
      isAuthenticated: boolean;
    }
  }
}

export {};
