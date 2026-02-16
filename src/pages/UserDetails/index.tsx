import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import { UserAvatar, FilledStar, EmptyStar } from '@/assets/images';
import styles from './UserDetails.module.scss';
import { guarantorData, sections } from './userDetailsData';
import DetailItem from './Detail_Item';
import GuarantorSection from './GuarantorSection';

const TABS = [
  'General Details',
  'Documents',
  'Bank Details',
  'Loans',
  'Savings',
  'App and System',
] as const;

const UserDetails = () => {
  return (
    <div>
      <Link to="/users" className={styles.back_link}>
        <MoveLeft size={20} />
        Back to Users
      </Link>

      <div className={styles.header_row}>
        <p className={styles.page_title}>User Details</p>
        <div className={styles.actions_row}>
          <button type="button" className={styles.btn_blacklist}>
            Blacklist User
          </button>
          <button type="button" className={styles.btn_activate}>
            Activate User
          </button>
        </div>
      </div>

      <div className={styles.summary_and_tabs_card}>
        <div className={styles.summary_card}>
          <div className={styles.summary_block}>
            <div className={styles.avatar_wrapper}>
              <img src={UserAvatar} alt="" />
            </div>
            <div>
              <h2 className={styles.summary_name}>Grace Effiom</h2>
              <p className={styles.summary_id}>LSQFf587g90</p>
            </div>
          </div>
          <div
            className={`${styles.summary_block} ${styles['summary_block--tier']}`}
          >
            <p className={styles.detail_label}>User&apos;s Tier</p>
            <div className={styles.tier_section}>
              <img src={FilledStar} alt="" aria-hidden />
              <img src={FilledStar} alt="" aria-hidden />
              <img src={EmptyStar} alt="" aria-hidden />
            </div>
          </div>
          <div
            className={`${styles.summary_block} ${styles['summary_block--amount']}`}
          >
            <p className={styles.summary_amount}>₦200,000.00</p>
            <p className={styles.summary_bank}>9912345678/Providus Bank</p>
          </div>
        </div>

        <div className={styles.tabs_row}>
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${styles.tab} ${tab === 'General Details' ? styles['tab--active'] : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content_card}>
        {sections.map((section, idx) => (
          <div key={idx} className={styles.section_block}>
            <h3 className={styles.section_title}>{section.title}</h3>
            <div className={styles.details_grid}>
              {section.data.map((item, i) => (
                <DetailItem key={i} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        ))}

        <GuarantorSection guarantors={guarantorData} />
      </div>
    </div>
  );
};

export default UserDetails;
