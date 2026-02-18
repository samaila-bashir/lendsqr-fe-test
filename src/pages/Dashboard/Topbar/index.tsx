import { Dropdown, Logo, Notification, UserPlaceholder } from '@/assets/images';
import styles from './Topbar.module.scss';
import { Menu } from 'lucide-react';
import SearchBar from '@/pages/Dashboard/SearchBar';

const Topbar = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <div className={styles.topbar_container}>
      <div className={styles.mobile_header}>
        <img src={Logo} alt="Lendsqr logo" className={styles.logo} />
        <button
          className={styles.hamburger}
          onClick={onToggle}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </div>

      <SearchBar />

      <div className={styles.right_area}>
        <p className={styles.doc}>Docs</p>
        <div className={styles.notification_area}>
          <img src={Notification} alt="Notification Bell" />
          <div className={styles.user_profile}>
            <img src={UserPlaceholder} alt="Avatar" />
            <p>Adedeji</p>
            <img src={Dropdown} alt="dropdown" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
