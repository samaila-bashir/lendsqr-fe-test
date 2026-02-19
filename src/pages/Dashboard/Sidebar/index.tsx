import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, X } from 'lucide-react';
import navLinks from './navlinks';
import styles from './Sidebar.module.scss';
import { SignOut, UserPlaceholder } from '@/assets/images';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { clearAuth } from '@/store/slices/authSlice';
import { clearUsers } from '@/store/slices/usersSlice';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(clearUsers());
    dispatch(clearAuth());
    navigate('/', { replace: true });
    onClose();
  };
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
          <img
            src={user?.avatarUrl ?? UserPlaceholder}
            alt="Avatar"
            className={styles.avatar}
          />
          <span>{user?.name ?? 'User'}</span>
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
          type="button"
          className={styles.logout_btn}
          onClick={handleLogout}
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
