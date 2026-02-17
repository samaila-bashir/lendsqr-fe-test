import { ChevronDownIcon, X } from 'lucide-react';
import navLinks from './navlinks';
import styles from './Sidebar.module.scss';
import { SignOut, UserPlaceholder } from '@/assets/images';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <nav
      className={`${styles.sidebar_container} ${isOpen ? styles.mobile_open : ''}`}
    >
      <button
        className={styles.close_btn}
        onClick={onClose}
        aria-label="Close menu"
      >
        <X size={20} />
      </button>

      <div className={styles.mobile_profile}>
        <div className={styles.user_info}>
          <img src={UserPlaceholder} alt="Avatar" className={styles.avatar} />
          <span>Adedeji</span>
        </div>
      </div>

      <ul className={styles.nav_list}>
        {navLinks.map((link) => {
          if (link.type === 'header') {
            return (
              <li key={link.label} className={styles.nav_header}>
                {link.label}
              </li>
            );
          }

          return (
            <li
              key={link.id}
              className={`${styles.nav_item} ${link.active ? styles.active : ''}`}
              onClick={onClose}
            >
              <img src={link.icon} className={styles.nav_icon} />

              <span className={styles.nav_label}>{link.label}</span>
              {link.hasDropdown && (
                <ChevronDownIcon className={styles.dropdown_icon} />
              )}
            </li>
          );
        })}
      </ul>

      <div className={styles.sidebar_footer}>
        <button
          className={styles.logout_btn}
          onClick={() => console.log('logout')}
        >
          <img src={SignOut} alt="Sign out" />
          <span>Logout</span>
        </button>
        <span className={styles.version}>v1.2.0</span>
      </div>
    </nav>
  );
};

export default Sidebar;
