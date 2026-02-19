import { useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import styles from './FilterPanel.module.scss';

export interface FilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

const DEFAULT_FILTERS: FilterValues = {
  organization: '',
  username: '',
  email: '',
  date: '',
  phoneNumber: '',
  status: '',
};

const STATUS_OPTIONS: { value: UserTypes.UserStatus | ''; label: string }[] = [
  { value: '', label: 'Select' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'blacklisted', label: 'Blacklisted' },
];

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterValues;
  onFiltersChange: (f: FilterValues) => void;
  onApply: () => void;
  /** Organization options (e.g. unique from loaded users). */
  organizations: string[];
}

const FilterPanel = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApply,
  organizations,
}: FilterPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-filter-panel]')) return;
      onClose();
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleReset = () => {
    onFiltersChange({ ...DEFAULT_FILTERS });
    onApply();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden />
      <div ref={panelRef} className={styles.panel} data-filter-panel>
        <h2 className={styles.panel_title}>Filter</h2>

        <div className={styles.form_group}>
          <label htmlFor="filter-org">Organization</label>
          <select
            id="filter-org"
            className={styles.select}
            value={filters.organization}
            onChange={(e) =>
              onFiltersChange({ ...filters, organization: e.target.value })
            }
          >
            <option value="">Select</option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.form_group}>
          <label htmlFor="filter-username">Username</label>
          <input
            id="filter-username"
            type="text"
            className={styles.input}
            placeholder="User"
            value={filters.username}
            onChange={(e) =>
              onFiltersChange({ ...filters, username: e.target.value })
            }
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="filter-email">Email</label>
          <input
            id="filter-email"
            type="email"
            className={styles.input}
            placeholder="Email"
            value={filters.email}
            onChange={(e) =>
              onFiltersChange({ ...filters, email: e.target.value })
            }
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="filter-date">Date</label>
          <div className={styles.date_wrapper}>
            <input
              id="filter-date"
              type="date"
              className={styles.input}
              placeholder="Date"
              value={filters.date}
              onChange={(e) =>
                onFiltersChange({ ...filters, date: e.target.value })
              }
            />
            <Calendar size={18} className={styles.calendar_icon} />
          </div>
        </div>

        <div className={styles.form_group}>
          <label htmlFor="filter-phone">Phone Number</label>
          <input
            id="filter-phone"
            type="tel"
            className={styles.input}
            placeholder="Phone Number"
            value={filters.phoneNumber}
            onChange={(e) =>
              onFiltersChange({ ...filters, phoneNumber: e.target.value })
            }
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            className={styles.select}
            value={filters.status}
            onChange={(e) =>
              onFiltersChange({ ...filters, status: e.target.value })
            }
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value || 'any'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.actions_btn} ${styles['actions_btn--reset']}`}
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            className={`${styles.actions_btn} ${styles['actions_btn--filter']}`}
            onClick={onApply}
          >
            Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
export { DEFAULT_FILTERS };
