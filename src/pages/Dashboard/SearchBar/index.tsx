import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchQuery,
  setSearchQuery,
} from '@/store/slices/usersSlice';
import styles from './SearchBar.module.scss';
import Input from '@/components/Input';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);

  return (
    <div className={styles.search_container}>
      <Input
        placeholder="Search for anything"
        className={styles.override_input}
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
      <button className={styles.search_btn} aria-label="Search">
        <Search size={14} color="#fff" />
      </button>
    </div>
  );
};

export default SearchBar;
