import { Calendar } from 'lucide-react';
import type { FilterValues } from '../FilterPanel';
import { STATUS_OPTIONS } from '../usersTableConstants';
import { toDdMmYyyy } from '../usersTableUtils';
import styles from '../UsersTable.module.scss';

export interface TableFilterFormProps {
  filters: FilterValues;
  onFiltersChange: (f: FilterValues) => void;
  organizations: string[];
  dateDisplayValue: string;
  onDateChange: (value: string) => void;
  onReset: () => void;
  onFilter: () => void;
}

const TableFilterForm = ({
  filters,
  onFiltersChange,
  organizations,
  dateDisplayValue,
  onDateChange,
  onReset,
  onFilter,
}: TableFilterFormProps) => (
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
            onFiltersChange({ ...filters, organization: e.target.value })
          }
          aria-label="Filter by organization"
        >
          <option value="">Select</option>
          {organizations.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filter_form_group}>
        <label htmlFor="filter-username" className={styles.filter_label}>
          Username
        </label>
        <input
          id="filter-username"
          type="text"
          className={styles.filter_input}
          placeholder="User"
          value={filters.username}
          onChange={(e) =>
            onFiltersChange({ ...filters, username: e.target.value })
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
            onFiltersChange({ ...filters, email: e.target.value })
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
            value={filters.date ? toDdMmYyyy(filters.date) : dateDisplayValue}
            onChange={(e) => onDateChange(e.target.value)}
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
            onFiltersChange({ ...filters, phoneNumber: e.target.value })
          }
          aria-label="Filter by phone number"
        />
      </div>
      <div className={styles.filter_form_group}>
        <label htmlFor="filter-status" className={styles.filter_label}>
          Status
        </label>
        <select
          id="filter-status"
          className={styles.filter_select}
          value={filters.status}
          onChange={(e) =>
            onFiltersChange({ ...filters, status: e.target.value })
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
          onClick={onReset}
        >
          Reset
        </button>
        <button
          type="button"
          className={`${styles.filter_actions_btn} ${styles['filter_actions_btn--filter']}`}
          onClick={onFilter}
        >
          Filter
        </button>
      </div>
    </div>
  </div>
);

export default TableFilterForm;
