import Topbar from './Topbar';
import Sidebar from './Sidebar';
import styles from './DashboardLayout.module.scss';
import { useState, type ReactNode } from 'react';

const DashboardLayout = ({ children }: { children?: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className={styles.container}>
      <Topbar onToggle={toggleSidebar} />

      <div className={styles.main_layout}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={styles.contents}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
