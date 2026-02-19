import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import styles from './LoginForm.module.scss';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

function isValidPassword(value: string): boolean {
  return value.length >= MIN_PASSWORD_LENGTH;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isValidPassword(password)) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    const user: AuthTypes.AuthUser = {
      name: faker.person.fullName(),
      email: email.trim(),
      avatarUrl: faker.image.avatar(),
    };
    dispatch(setUser(user));
    navigate('/users');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form_col}>
        <div>
          <h1 className={styles.form_title}>Welcome!</h1>
          <p className={styles.form_desc}>Enter details to login.</p>
        </div>

        <div className={styles.form_input}>
          <Input
            placeholder="Email"
            type="email"
            radius="sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_input}>
          <Input
            placeholder="Password"
            type="password"
            radius="sm"
            showPasswordBtn="show"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className={styles.form_error}>{error}</p>}

        <a href="#" className={styles.forgotPassword}>
          Forgot Password?
        </a>

        <Button type="submit" variant="primary" className={styles.submitBtn}>
          Log in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
