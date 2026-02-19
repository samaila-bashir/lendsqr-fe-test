import { useRoutes } from 'react-router-dom';
import { routeConfig } from '@/routes/config';

const App = () => {
  return useRoutes(routeConfig);
};

export default App;
