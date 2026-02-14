import { Logo } from '@/assets/images';
import styles from './Topbar.module.scss';
import { Menu } from 'lucide-react';

const Topbar = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <div className={styles.topbar_container}>
      <img src={Logo} alt="Lendsqr logo" className={styles.logo} />

      <button className={styles.hamburger} onClick={onToggle}>
        <Menu size={24} />
      </button>
    </div>
  );
};

export default Topbar;
