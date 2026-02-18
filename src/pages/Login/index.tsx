import LoginForm from '@/pages/Login/LoginForm';
import styles from './Login.module.scss';
import { LoginIllustration, Logo } from '@/assets/images';

const Login = () => {
  return (
    <div className={styles.login_container}>
      <div className={styles.login_contents}>
        <div className={styles.images_container}>
          <div className={styles.logo_wrapper}>
            <img src={Logo} alt="Lendsqr Logo" />
          </div>
          <div className={styles.illustration_wrapper}>
            <img src={LoginIllustration} alt="login-illustration" />
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
