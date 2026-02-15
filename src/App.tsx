import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<DashboardLayout />}>
        <Route index element={<Users />} />
        <Route path="details" element={<UserDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
