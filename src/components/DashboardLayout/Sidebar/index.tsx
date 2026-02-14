import { ChevronDownIcon } from 'lucide-react';
import navLinks from './navlinks';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <nav
      className={`${styles.sidebar_container} ${isOpen ? styles.mobile_open : ''}`}
    >
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
    </nav>
  );
};

export default Sidebar;
