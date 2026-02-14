import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './LoginForm.module.scss';
import { Link } from 'react-router-dom';

const formFields = [
  {
    id: '1',
    placeholder: 'Email',
    type: 'email',
  },
  {
    id: '2',
    placeholder: 'Password',
    type: 'password',
    showPasswordBtn: 'show',
  },
];

const LoginForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.form_col}>
        <div>
          <h1 className={styles.form_title}>Welcome!</h1>
          <p className={styles.form_desc}>Enter details to login.</p>
        </div>

        {formFields.map((field) => (
          <Input key={field.id} {...field} radius="sm" />
        ))}

        <Link to="#" className={styles.forgotPassword}>
          Forgot Password?
        </Link>

        <Button type="submit" variant="primary" className={styles.submitBtn}>
          Log in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
