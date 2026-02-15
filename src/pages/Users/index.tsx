import {
  UsersIcon,
  Users2Icon,
  LoanIcon,
  MoneyIcon,
} from '@/assets/images';
import UsersTable from '@/features/UsersTable';
import styles from './Users.module.scss';

const STATS = [
  {
    label: 'Users',
    value: '2,453',
    icon: UsersIcon,
    iconClass: styles['icon_wrapper--users'],
  },
  {
    label: 'Active Users',
    value: '2,453',
    icon: Users2Icon,
    iconClass: styles['icon_wrapper--active'],
  },
  {
    label: 'Users with Loans',
    value: '12,453',
    icon: LoanIcon,
    iconClass: styles['icon_wrapper--loans'],
  },
  {
    label: 'Users with Savings',
    value: '102,453',
    icon: MoneyIcon,
    iconClass: styles['icon_wrapper--savings'],
  },
];

const Users = () => {
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
