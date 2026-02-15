import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Eye, UserX, UserCheck, Calendar } from 'lucide-react';
import { FilterResultsButton } from '@/assets/images';
import { MOCK_USERS, type User, type UserStatus } from '@/data/users';
import { DEFAULT_FILTERS, type FilterValues } from './FilterPanel';
import Pagination from './Pagination';
import styles from './UsersTable.module.scss';

const ORGANIZATIONS = [
  'Lendsqr',
  'Irorun',
  'Lendstar',
  'Cashville',
  'Fintech Hub',
];
const STATUS_OPTIONS: { value: UserStatus | ''; label: string }[] = [
  { value: '', label: 'Select' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'blacklisted', label: 'Blacklisted' },
];

const COLUMNS = [
  { key: 'organization', label: 'Organization' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'dateJoined', label: 'Date Joined' },
  { key: 'status', label: 'Status' },
] as const;

function toDdMmYyyy(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return '';
  return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
}

function parseDateToIso(value: string): string {
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

function applyFilters(users: User[], filters: FilterValues): User[] {
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

interface RowActionsProps {
  user: User;
  onClose: () => void;
  onViewDetails: (user: User) => void;
  onBlacklist: (user: User) => void;
  onActivate: (user: User) => void;
}

const RowActions = ({
  user,
  onClose,
  onViewDetails,
  onBlacklist,
  onActivate,
}: RowActionsProps) => (
  <ul className={styles.actions_menu} role="menu" data-actions-menu>
    <li role="none">
      <button
        type="button"
        className={styles.actions_menu_item}
        role="menuitem"
        onClick={() => {
          onViewDetails(user);
          onClose();
        }}
      >
        <Eye size={16} />
        View Details
      </button>
    </li>
    <li role="none">
      <button
        type="button"
        className={styles.actions_menu_item}
        role="menuitem"
        onClick={() => {
          onBlacklist(user);
          onClose();
        }}
      >
        <UserX size={16} />
        Blacklist User
      </button>
    </li>
    <li role="none">
      <button
        type="button"
        className={styles.actions_menu_item}
        role="menuitem"
        onClick={() => {
          onActivate(user);
          onClose();
        }}
      >
        <UserCheck size={16} />
        Activate User
      </button>
    </li>
  </ul>
);

const UsersTable = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>(DEFAULT_FILTERS);
  const [dateDisplayValue, setDateDisplayValue] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(`[data-actions-menu]`) &&
        !target.closest(`[data-actions-btn]`)
      ) {
        setOpenActionsId(null);
      }
      if (
        isFilterOpen &&
        !target.closest('[data-filter-panel]') &&
        !target.closest(`.${styles.filter_btn}`)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isFilterOpen]);

  const filtered = useMemo(
    () => applyFilters(users, filters),
    [users, filters]
  );
  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / pageSize) || 1;
  const currentPage = Math.min(page, totalPages) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const handleViewDetails = (user: User) => {
    setOpenActionsId(null);
    navigate('/users/details');
    void user;
  };

  const handleBlacklist = (user: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: 'blacklisted' as UserStatus } : u
      )
    );
    setOpenActionsId(null);
  };

  const handleActivate = (user: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: 'active' as UserStatus } : u
      )
    );
    setOpenActionsId(null);
  };

  const handleResetFilters = () => {
    setFilters({ ...DEFAULT_FILTERS });
    setDateDisplayValue('');
    setPage(1);
  };

  const handleDateChange = (value: string) => {
    setDateDisplayValue(value);
    const iso = parseDateToIso(value);
    if (iso) setFilters((prev) => ({ ...prev, date: iso }));
    else setFilters((prev) => ({ ...prev, date: '' }));
  };

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  return (
    <>
      <section className={styles.table_section}>
        <div className={styles.table_wrapper}>
          {isFilterOpen && (
            <div className={styles.filter_panel} data-filter-panel>
              <div className={styles.filter_form}>
                <div className={styles.filter_form_group}>
                  <label htmlFor="filter-org" className={styles.filter_label}>
                    Organization
                  </label>
                  <select
                    id="filter-org"
                    className={styles.filter_select}
                    value={filters.organization}
                    onChange={(e) =>
                      setFilters({ ...filters, organization: e.target.value })
                    }
                    aria-label="Filter by organization"
                  >
                    <option value="">Select</option>
                    {ORGANIZATIONS.map((org) => (
                      <option key={org} value={org}>
                        {org}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.filter_form_group}>
                  <label
                    htmlFor="filter-username"
                    className={styles.filter_label}
                  >
                    Username
                  </label>
                  <input
                    id="filter-username"
                    type="text"
                    className={styles.filter_input}
                    placeholder="User"
                    value={filters.username}
                    onChange={(e) =>
                      setFilters({ ...filters, username: e.target.value })
                    }
                    aria-label="Filter by username"
                  />
                </div>
                <div className={styles.filter_form_group}>
                  <label htmlFor="filter-email" className={styles.filter_label}>
                    Email
                  </label>
                  <input
                    id="filter-email"
                    type="text"
                    className={styles.filter_input}
                    placeholder="Email"
                    value={filters.email}
                    onChange={(e) =>
                      setFilters({ ...filters, email: e.target.value })
                    }
                    aria-label="Filter by email"
                  />
                </div>
                <div className={styles.filter_form_group}>
                  <label htmlFor="filter-date" className={styles.filter_label}>
                    Date
                  </label>
                  <div className={styles.filter_date_wrapper}>
                    <input
                      id="filter-date"
                      type="text"
                      className={styles.filter_input}
                      placeholder="Date"
                      value={
                        filters.date
                          ? toDdMmYyyy(filters.date)
                          : dateDisplayValue
                      }
                      onChange={(e) => handleDateChange(e.target.value)}
                      aria-label="Filter by date"
                    />
                    <Calendar
                      size={18}
                      className={styles.filter_calendar_icon}
                      aria-hidden
                    />
                  </div>
                </div>
                <div className={styles.filter_form_group}>
                  <label htmlFor="filter-phone" className={styles.filter_label}>
                    Phone Number
                  </label>
                  <input
                    id="filter-phone"
                    type="tel"
                    className={styles.filter_input}
                    placeholder="Phone Number"
                    value={filters.phoneNumber}
                    onChange={(e) =>
                      setFilters({ ...filters, phoneNumber: e.target.value })
                    }
                    aria-label="Filter by phone number"
                  />
                </div>
                <div className={styles.filter_form_group}>
                  <label
                    htmlFor="filter-status"
                    className={styles.filter_label}
                  >
                    Status
                  </label>
                  <select
                    id="filter-status"
                    className={styles.filter_select}
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value })
                    }
                    aria-label="Filter by status"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value || 'any'} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.filter_actions}>
                  <button
                    type="button"
                    className={`${styles.filter_actions_btn} ${styles['filter_actions_btn--reset']}`}
                    onClick={handleResetFilters}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className={`${styles.filter_actions_btn} ${styles['filter_actions_btn--filter']}`}
                    onClick={() => {
                      setPage(1);
                      setIsFilterOpen(false);
                    }}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
          )}

          <table className={styles.table}>
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th key={col.key} className={styles.th}>
                    <span className={styles.th_content}>
                      {col.label}
                      <button
                        type="button"
                        className={`${styles.filter_btn} ${isFilterOpen ? styles.filter_btn_active : ''}`}
                        onClick={toggleFilter}
                        aria-label={
                          isFilterOpen ? 'Hide filter' : 'Show filter'
                        }
                        aria-expanded={isFilterOpen}
                      >
                        <img src={FilterResultsButton} alt="" aria-hidden />
                      </button>
                    </span>
                  </th>
                ))}
                <th className={styles.th} aria-label="Actions">
                  {' '}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user) => (
                <tr key={user.id} className={styles.tr}>
                  <td className={styles.td}>{user.organization}</td>
                  <td className={styles.td}>{user.username}</td>
                  <td className={styles.td}>{user.email}</td>
                  <td className={styles.td}>{user.phoneNumber}</td>
                  <td className={styles.td}>{user.dateJoined}</td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.status_pill} ${styles[`status_pill--${user.status}`]}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className={styles.actions_cell}>
                    <div className={styles.filter_trigger_wrapper}>
                      <button
                        type="button"
                        className={styles.actions_btn}
                        data-actions-btn
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenActionsId(
                            openActionsId === user.id ? null : user.id
                          );
                        }}
                        aria-haspopup="menu"
                        aria-expanded={openActionsId === user.id}
                        aria-label="Open actions menu"
                      >
                        <MoreVertical size={20} />
                      </button>
                      {openActionsId === user.id && (
                        <RowActions
                          user={user}
                          onClose={() => setOpenActionsId(null)}
                          onViewDetails={handleViewDetails}
                          onBlacklist={handleBlacklist}
                          onActivate={handleActivate}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Pagination
        total={totalFiltered}
        pageSize={pageSize}
        page={currentPage}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </>
  );
};

export default UsersTable;
