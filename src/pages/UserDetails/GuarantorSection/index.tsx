import DetailItem from '../DetailItem';
import styles from '../UserDetails.module.scss';

interface GuarantorSectionProps {
  guarantors: UserTypes.Guarantor[];
}

const GuarantorSection = ({ guarantors }: GuarantorSectionProps) => {
  return (
    <div className={styles.section_block}>
      <h3 className={styles.section_title}>Guarantor</h3>
      {guarantors.map((guarantor, index) => (
        <div key={index} className={styles.guarantor_card}>
          <div className={styles.details_grid}>
            {Object.entries(guarantor).map(([label, value]) => (
              <DetailItem
                key={label}
                label={label.replace(/([A-Z])/g, ' $1')}
                value={value}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuarantorSection;
