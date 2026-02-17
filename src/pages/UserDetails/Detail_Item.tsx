import styles from './UserDetails.module.scss';

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem = ({ label, value }: DetailItemProps) => (
  <div className={styles.detail_item}>
    <p className={styles.detail_label}>{label}</p>
    <p className={styles.detail_value}>{value}</p>
  </div>
);

export default DetailItem;
