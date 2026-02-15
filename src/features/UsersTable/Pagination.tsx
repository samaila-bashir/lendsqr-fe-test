import styles from './Pagination.module.scss';

interface PaginationProps {
  total: number;
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

const Pagination = ({
  total,
  pageSize,
  page,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize) || 1;

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | 'ellipsis')[] = [];
    pages.push(1, 2, 3, 'ellipsis', totalPages - 1, totalPages);
    return pages;
  };

  return (
    <section className={styles.pagination_section} aria-label="Pagination">
      <div className={styles.left}>
        <span className={styles.showing_text}>Showing</span>
        <select
          className={styles.page_size_select}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          aria-label="Items per page"
        >
          {pageSizeOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
          {total > 0 && !pageSizeOptions.includes(total) && (
            <option value={total}>{total}</option>
          )}
        </select>
        <span className={styles.showing_text}>out of {total}</span>
      </div>

      <div className={styles.right}>
        <button
          type="button"
          className={styles.page_btn}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          &lt;
        </button>
        {getPageNumbers().map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`ellipsis-${i}`} className={`${styles.page_btn} ${styles['page_btn--ellipsis']}`}>
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={`${styles.page_btn} ${p === page ? styles['page_btn--active'] : ''}`}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}
        <button
          type="button"
          className={styles.page_btn}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default Pagination;
