import { Eye, UserX, UserCheck } from 'lucide-react';
import styles from '../UsersTable.module.scss';

export interface RowActionsProps {
  user: UserTypes.User;
  onClose: () => void;
  onViewDetails: (user: UserTypes.User) => void;
  onBlacklist: (user: UserTypes.User) => void;
  onActivate: (user: UserTypes.User) => void;
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

export default RowActions;
