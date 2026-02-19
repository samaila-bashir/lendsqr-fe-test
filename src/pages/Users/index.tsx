import { useMemo } from 'react';
import { UsersIcon, Users2Icon, LoanIcon, MoneyIcon } from '@/assets/images';
import UsersTable from '@/pages/Users/UsersTable';
import styles from './Users.module.scss';
import { useSelector } from 'react-redux';
import { selectUsersList } from '@/store/slices/usersSlice';

const Users = () => {
  const users = useSelector(selectUsersList);

  // All metrics from the same 500 users loaded on app start (Faker, batched into store).
  const STATS = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === 'active').length;
    const withLoans = users.filter((u) => u.hasLoan === true).length;
    const withSavings = users.filter((u) => u.hasSavings === true).length;
    return [
      {
        label: 'Users',
        value: total.toLocaleString(),
        icon: UsersIcon,
        iconClass: styles['icon_wrapper--users'],
      },
      {
        label: 'Active Users',
        value: active.toLocaleString(),
        icon: Users2Icon,
        iconClass: styles['icon_wrapper--active'],
      },
      {
        label: 'Users with Loans',
        value: withLoans.toLocaleString(),
        icon: LoanIcon,
        iconClass: styles['icon_wrapper--loans'],
      },
      {
        label: 'Users with Savings',
        value: withSavings.toLocaleString(),
        icon: MoneyIcon,
        iconClass: styles['icon_wrapper--savings'],
      },
    ];
  }, [users]);

  return (
    <div>
      <h1 className={styles.page_title}>Users</h1>

      <section className={styles.cards_grid} aria-label="User statistics">
        {STATS.map((stat) => (
          <article key={stat.label} className={styles.card}>
            <div className={`${styles.icon_wrapper} ${stat.iconClass}`}>
              <img src={stat.icon} alt="" aria-hidden />
            </div>
            <p className={styles.card_label}>{stat.label}</p>
            <p className={styles.card_value}>{stat.value}</p>
          </article>
        ))}
      </section>

      <UsersTable />
    </div>
  );
};

export default Users;
