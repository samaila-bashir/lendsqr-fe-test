import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import styles from './Dashboard.module.scss';
import { useState } from 'react';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className={styles.container}>
      <Topbar onToggle={toggleSidebar} />

      <div className={styles.main_layout}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={styles.contents}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
