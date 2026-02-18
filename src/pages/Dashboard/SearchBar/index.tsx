import { Search } from 'lucide-react';
import styles from './SearchBar.module.scss';
import Input from '@/components/Input';

const SearchBar = () => {
  return (
    <div className={styles.search_container}>
      <Input
        placeholder="Search for anything"
        className={styles.override_input}
      />
      <button className={styles.search_btn} aria-label="Search">
        <Search size={14} color="#fff" />
      </button>
    </div>
  );
};

export default SearchBar;
