import { createRoot } from 'react-dom/client';
import CustomProvider from '@/components/CustomProvider';
import '@/styles/main.scss';

createRoot(document.getElementById('root')!).render(<CustomProvider />);
