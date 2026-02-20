import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import { FilterResultsButton } from '@/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchQuery,
  selectUsersList,
  updateUserStatus,
} from '@/store/slices/usersSlice';
import { DEFAULT_FILTERS, type FilterValues } from './FilterPanel';
import Pagination from './Pagination';
import RowActions from './RowActions';
import TableFilterForm from './TableFilterForm';
import {
  applyFilters,
  applyFullTextSearch,
  parseDateToIso,
} from './usersTableUtils';
import { COLUMNS } from './usersTableConstants';
import styles from './UsersTable.module.scss';

const UsersTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectUsersList);
  const searchQuery = useSelector(selectSearchQuery);
  const organizations = useMemo(
    () => [...new Set(users.map((u) => u.organization))].sort(),
    [users]
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>(DEFAULT_FILTERS);
  const [dateDisplayValue, setDateDisplayValue] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);

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
    () => applyFullTextSearch(applyFilters(users, filters), searchQuery),
    [users, filters, searchQuery]
  );
  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / pageSize) || 1;
  const currentPage = Math.min(page, totalPages) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const handleViewDetails = (user: UserTypes.User) => {
    setOpenActionsId(null);
    navigate(`/users/details/${user.id}`);
  };

  const handleBlacklist = (user: UserTypes.User) => {
    dispatch(updateUserStatus({ id: user.id, status: 'blacklisted' }));
    setOpenActionsId(null);
  };

  const handleActivate = (user: UserTypes.User) => {
    dispatch(updateUserStatus({ id: user.id, status: 'active' }));
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
            <TableFilterForm
              filters={filters}
              onFiltersChange={setFilters}
              organizations={organizations}
              dateDisplayValue={dateDisplayValue}
              onDateChange={handleDateChange}
              onReset={handleResetFilters}
              onFilter={() => {
                setPage(1);
                setIsFilterOpen(false);
              }}
            />
          )}

          <table className={styles.table}>
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={`${styles.th} ${col.key === 'dateJoined' ? styles.th_date : ''}`}
                  >
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
                  <td className={`${styles.td} ${styles.td_date}`}>
                    {user.dateJoined}
                  </td>
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
