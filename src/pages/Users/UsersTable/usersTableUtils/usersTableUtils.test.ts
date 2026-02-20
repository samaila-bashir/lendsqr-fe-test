import { describe, it, expect } from 'vitest';
import {
  toDdMmYyyy,
  parseDateToIso,
  applyFullTextSearch,
  applyFilters,
} from '.';

describe('usersTableUtils', () => {
  describe('toDdMmYyyy', () => {
    it('formats ISO date to DD/MM/YYYY', () => {
      expect(toDdMmYyyy('2024-01-15')).toBe('15/01/2024');
    });

    it('pads single digit day and month', () => {
      expect(toDdMmYyyy('2024-09-05')).toBe('05/09/2024');
    });

    it('returns empty string for empty input', () => {
      expect(toDdMmYyyy('')).toBe('');
    });

    it('returns empty string for invalid format', () => {
      expect(toDdMmYyyy('invalid')).toBe('');
    });
  });

  describe('parseDateToIso', () => {
    it('parses DD/MM/YYYY to ISO', () => {
      expect(parseDateToIso('15/01/2024')).toBe('2024-01-15');
    });

    it('parses D/M/YYYY with single digits', () => {
      expect(parseDateToIso('5/9/2024')).toBe('2024-09-05');
    });

    it('accepts hyphen as separator', () => {
      expect(parseDateToIso('15-01-2024')).toBe('2024-01-15');
    });

    it('returns empty string for empty input', () => {
      expect(parseDateToIso('')).toBe('');
      expect(parseDateToIso('   ')).toBe('');
    });

    it('returns empty string for invalid format', () => {
      expect(parseDateToIso('not-a-date')).toBe('');
      expect(parseDateToIso('1/1/24')).toBe('');
    });
  });

  describe('applyFullTextSearch', () => {
    const users: UserTypes.User[] = [
      {
        id: '1',
        organization: 'Org A',
        username: 'jane_doe',
        email: 'jane@example.com',
        phoneNumber: '08012345678',
        dateJoined: '2024-01-15',
        status: 'active',
      },
      {
        id: '2',
        organization: 'Org B',
        username: 'john_smith',
        email: 'john@test.com',
        phoneNumber: '08087654321',
        dateJoined: '2023-06-20',
        status: 'inactive',
      },
    ];

    it('returns all users when query is empty', () => {
      expect(applyFullTextSearch(users, undefined)).toEqual(users);
      expect(applyFullTextSearch(users, '')).toEqual(users);
      expect(applyFullTextSearch(users, '   ')).toEqual(users);
    });

    it('filters by single token', () => {
      const result = applyFullTextSearch(users, 'jane');
      expect(result).toHaveLength(1);
      expect(result[0].username).toBe('jane_doe');
    });

    it('filters by multiple tokens (all must match)', () => {
      const result = applyFullTextSearch(users, 'jane org');
      expect(result).toHaveLength(1);
      expect(result[0].username).toBe('jane_doe');
    });

    it('returns empty when token does not match', () => {
      expect(applyFullTextSearch(users, 'nonexistent')).toHaveLength(0);
    });

    it('is case insensitive', () => {
      const result = applyFullTextSearch(users, 'JANE');
      expect(result).toHaveLength(1);
      expect(result[0].username).toBe('jane_doe');
    });
  });

  describe('applyFilters', () => {
    const users: UserTypes.User[] = [
      {
        id: '1',
        organization: 'Org A',
        username: 'jane_doe',
        email: 'jane@example.com',
        phoneNumber: '08012345678',
        dateJoined: '2024-01-15',
        status: 'active',
      },
      {
        id: '2',
        organization: 'Org B',
        username: 'john_smith',
        email: 'john@test.com',
        phoneNumber: '08087654321',
        dateJoined: '2023-06-20',
        status: 'inactive',
      },
    ];

    const emptyFilters = {
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: '',
    };

    it('returns all users when filters are empty', () => {
      expect(applyFilters(users, emptyFilters)).toEqual(users);
    });

    it('filters by organization', () => {
      const result = applyFilters(users, {
        ...emptyFilters,
        organization: 'Org A',
      });
      expect(result).toHaveLength(1);
      expect(result[0].organization).toBe('Org A');
    });

    it('filters by username (partial match)', () => {
      const result = applyFilters(users, {
        ...emptyFilters,
        username: 'jane',
      });
      expect(result).toHaveLength(1);
      expect(result[0].username).toBe('jane_doe');
    });

    it('filters by email (partial match)', () => {
      const result = applyFilters(users, {
        ...emptyFilters,
        email: 'example.com',
      });
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe('jane@example.com');
    });

    it('filters by phoneNumber', () => {
      const result = applyFilters(users, {
        ...emptyFilters,
        phoneNumber: '0808765',
      });
      expect(result).toHaveLength(1);
      expect(result[0].phoneNumber).toBe('08087654321');
    });

    it('filters by status', () => {
      const result = applyFilters(users, {
        ...emptyFilters,
        status: 'inactive',
      });
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('inactive');
    });

    it('filters by date', () => {
      const result = applyFilters(users, {
        ...emptyFilters,
        date: '2024-01-15',
      });
      expect(result).toHaveLength(1);
      expect(result[0].dateJoined).toBe('2024-01-15');
    });
  });
});
