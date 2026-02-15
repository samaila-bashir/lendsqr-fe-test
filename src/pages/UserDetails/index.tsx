import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { UserAvatar, FilledStar, EmptyStar } from '@/assets/images';
import styles from './UserDetails.module.scss';

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
        <ChevronLeft size={20} />
        Back to Users
      </Link>

      <div className={styles.header_row}>
        <h1 className={styles.page_title}>User Details</h1>
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
          <div className={`${styles.summary_block} ${styles['summary_block--tier']}`}>
            <p className={styles.detail_label}>User&apos;s Tier</p>
            <div className={styles.tier_section}>
              <img src={FilledStar} alt="" aria-hidden />
              <img src={FilledStar} alt="" aria-hidden />
              <img src={EmptyStar} alt="" aria-hidden />
            </div>
          </div>
          <div className={`${styles.summary_block} ${styles['summary_block--amount']}`}>
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
        <div className={styles.section_block}>
          <h3 className={styles.section_title}>Personal Information</h3>
          <div className={styles.details_grid}>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Full Name</p>
            <p className={styles.detail_value}>Grace Effiom</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Phone Number</p>
            <p className={styles.detail_value}>07060780922</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Email Address</p>
            <p className={styles.detail_value}>grace@gmail.com</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>BVN</p>
            <p className={styles.detail_value}>07060780922</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Gender</p>
            <p className={styles.detail_value}>Female</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Marital Status</p>
            <p className={styles.detail_value}>Single</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Children</p>
            <p className={styles.detail_value}>None</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Type of Residence</p>
            <p className={styles.detail_value}>Parent&apos;s Apartment</p>
          </div>
        </div>
        </div>

        <div className={styles.section_block}>
          <h3 className={styles.section_title}>Education and Employment</h3>
          <div className={styles.details_grid}>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Level of Education</p>
            <p className={styles.detail_value}>B.Sc</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Employment Status</p>
            <p className={styles.detail_value}>Employed</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Sector of Employment</p>
            <p className={styles.detail_value}>FinTech</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Duration of Employment</p>
            <p className={styles.detail_value}>2 years</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Office Email</p>
            <p className={styles.detail_value}>grace@lendsqr.com</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Monthly Income</p>
            <p className={styles.detail_value}>₦200,000.00- ₦400,000.00</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Loan Repayment</p>
            <p className={styles.detail_value}>40,000</p>
          </div>
        </div>
        </div>

        <div className={styles.section_block}>
          <h3 className={styles.section_title}>Socials</h3>
          <div className={styles.details_grid}>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Twitter</p>
            <p className={styles.detail_value}>@grace_effiom</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Facebook</p>
            <p className={styles.detail_value}>Grace Effiom</p>
          </div>
          <div className={styles.detail_item}>
            <p className={styles.detail_label}>Instagram</p>
            <p className={styles.detail_value}>@grace_effiom</p>
          </div>
        </div>
        </div>

        <div className={styles.section_block}>
          <h3 className={styles.section_title}>Guarantor</h3>
          <div className={styles.guarantor_card}>
          <p className={styles.guarantor_title}>Guarantor 1</p>
          <div className={styles.details_grid}>
            <div className={styles.detail_item}>
              <p className={styles.detail_label}>Full Name</p>
              <p className={styles.detail_value}>Debby Ogana</p>
            </div>
            <div className={styles.detail_item}>
              <p className={styles.detail_label}>Phone Number</p>
              <p className={styles.detail_value}>07060780922</p>
            </div>
            <div className={styles.detail_item}>
              <p className={styles.detail_label}>Email Address</p>
              <p className={styles.detail_value}>debby@gmail.com</p>
            </div>
            <div className={styles.detail_item}>
              <p className={styles.detail_label}>Relationship</p>
              <p className={styles.detail_value}>Sister</p>
            </div>
          </div>
        </div>
        <div className={styles.guarantor_card}>
          <p className={styles.guarantor_title}>Guarantor 2</p>
          <div className={styles.details_grid}>
            <div className={styles.detail_item}>
              <p className={styles.detail_label}>Full Name</p>
              <p className={styles.detail_value}>Debby Ogana</p>
            </div>
            <div className={styles.detail_item}>
              <p className={styles.detail_label}>Phone Number</p>
              <p className={styles.detail_value}>07060780922</p>
            </div>
            <div className={styles.detail_item}>
              <p className={styles.detail_label}>Email Address</p>
              <p className={styles.detail_value}>debby@gmail.com</p>
            </div>
            <div className={styles.detail_item}>
              <p className={styles.detail_label}>Relationship</p>
              <p className={styles.detail_value}>Sister</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
