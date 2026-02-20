import type { FilterValues } from '../FilterPanel';

export function toDdMmYyyy(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return '';
  return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
}

export function parseDateToIso(value: string): string {
  if (!value.trim()) return '';
  const normalized = value.trim().replace(/-/g, '/');
  const parts = normalized.split('/');
  if (parts.length !== 3) return '';
  const [d, m, y] = parts;
  if (!d || !m || !y || y.length !== 4) return '';
  const day = d.padStart(2, '0');
  const month = m.padStart(2, '0');
  const year = y;
  const date = new Date(`${year}-${month}-${day}`);
  if (Number.isNaN(date.getTime())) return '';
  return `${year}-${month}-${day}`;
}

export function applyFullTextSearch(
  users: UserTypes.User[],
  query: string | undefined
): UserTypes.User[] {
  const trimmed = (query ?? '').trim();
  if (!trimmed) return users;
  const tokens = trimmed.toLowerCase().split(/\s+/).filter(Boolean);
  return users.filter((u) => {
    const searchable = [
      u.organization,
      u.username,
      u.email,
      u.phoneNumber,
      u.dateJoined,
      u.status,
    ]
      .join(' ')
      .toLowerCase();
    return tokens.every((t) => searchable.includes(t));
  });
}

export function applyFilters(
  users: UserTypes.User[],
  filters: FilterValues
): UserTypes.User[] {
  return users.filter((u) => {
    if (filters.organization && u.organization !== filters.organization)
      return false;
    if (
      filters.username &&
      !u.username.toLowerCase().includes(filters.username.toLowerCase())
    )
      return false;
    if (
      filters.email &&
      !u.email.toLowerCase().includes(filters.email.toLowerCase())
    )
      return false;
    if (filters.phoneNumber && !u.phoneNumber.includes(filters.phoneNumber))
      return false;
    if (filters.status && u.status !== filters.status) return false;
    if (filters.date) {
      const d = new Date(u.dateJoined);
      const filterDate = new Date(filters.date);
      if (
        d.getFullYear() !== filterDate.getFullYear() ||
        d.getMonth() !== filterDate.getMonth() ||
        d.getDate() !== filterDate.getDate()
      )
        return false;
    }
    return true;
  });
}
