import { useEffect, useState } from 'react';
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
  const [draft, setDraft] = useState(searchQuery);

  useEffect(() => {
    setDraft(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    dispatch(setSearchQuery(draft));
  };

  return (
    <div className={styles.search_container}>
      <Input
        placeholder="Search for anything"
        className={styles.override_input}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <button
        type="button"
        className={styles.search_btn}
        aria-label="Search"
        onClick={handleSearch}
      >
        <Search size={14} color="#fff" />
      </button>
    </div>
  );
};

export default SearchBar;
