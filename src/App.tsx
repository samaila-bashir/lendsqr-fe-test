import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<DashboardLayout />} />
    </Routes>
  );
};

export default App;
