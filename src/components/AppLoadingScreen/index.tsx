import { Logo } from '@/assets/images';
import styles from './AppLoadingScreen.module.scss';

interface AppLoadingScreenProps {
  progress: number;
}

const AppLoadingScreen = ({ progress }: AppLoadingScreenProps) => {

  return (
    <div className={styles.screen} role="status" aria-label="Loading contacts">
      <div className={styles.content}>
        <div className={styles.logo_and_loader}>
          <img src={Logo} alt="Lendsqr" className={styles.logo} />
          <div className={styles.progress_wrapper}>
            <div
              className={styles.progress_track}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={styles.progress_fill}
                style={{ width: `${progress}%` }}
              />
              <span className={styles.progress_percent}>{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLoadingScreen;
