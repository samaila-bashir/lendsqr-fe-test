import { useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import { UserAvatar, FilledStar, EmptyStar } from '@/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserById, updateUserStatus } from '@/store/slices/usersSlice';
import styles from './UserDetails.module.scss';
import { generateUserDetailsFromFaker } from './userDetails.mock';
import DetailItem from './DetailItem';
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
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUserById(userId ?? ''));
  const details = useMemo(
    () => generateUserDetailsFromFaker(user ?? undefined),
    [user]
  );
  const { summary, sections, guarantors } = details;

  useEffect(() => {
    if (!userId) {
      navigate('/users', { replace: true });
      return;
    }
  }, [userId, navigate]);

  if (!userId) return null;
  if (!user) {
    return (
      <div>
        <Link to="/users" className={styles.back_link}>
          <MoveLeft size={20} />
          Back to Users
        </Link>
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/users" className={styles.back_link}>
        <MoveLeft size={20} />
        Back to Users
      </Link>

      <div className={styles.header_row}>
        <p className={styles.page_title}>User Details</p>
        <div className={styles.actions_row}>
          <button
            type="button"
            className={styles.btn_blacklist}
            onClick={() =>
              user &&
              dispatch(updateUserStatus({ id: user.id, status: 'blacklisted' }))
            }
          >
            Blacklist User
          </button>
          <button
            type="button"
            className={styles.btn_activate}
            onClick={() =>
              user &&
              dispatch(updateUserStatus({ id: user.id, status: 'active' }))
            }
          >
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
              <h2 className={styles.summary_name}>{summary.fullName}</h2>
              <p className={styles.summary_id}>{summary.id}</p>
            </div>
          </div>
          <div
            className={`${styles.summary_block} ${styles['summary_block--tier']}`}
          >
            <p className={styles.detail_label}>User&apos;s Tier</p>
            <div className={styles.tier_section}>
              {[1, 2, 3].map((i) =>
                i <= summary.tierCount ? (
                  <img key={i} src={FilledStar} alt="" aria-hidden />
                ) : (
                  <img key={i} src={EmptyStar} alt="" aria-hidden />
                )
              )}
            </div>
          </div>
          <div
            className={`${styles.summary_block} ${styles['summary_block--amount']}`}
          >
            <p className={styles.summary_amount}>{summary.amount}</p>
            <p className={styles.summary_bank}>{summary.bankAccount}</p>
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

        <GuarantorSection guarantors={guarantors} />
      </div>
    </div>
  );
};

export default UserDetails;
