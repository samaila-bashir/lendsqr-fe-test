import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  showPasswordBtn?: string;
  placeholder: string;
  radius?: 'sm' | 'md';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      className,
      showPasswordBtn,
      placeholder,
      radius = 'sm',
      ...props
    },
    ref
  ) => {
    const containerClasses = `${styles.fieldContainer} ${styles[`radius-${radius}`]}`;

    return (
      <div className={styles.inputWrapper}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={`${containerClasses} ${error ? styles.hasError : ''}`}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            ref={ref}
            className={`${styles.input} ${className || ''}`}
            {...props}
            placeholder={placeholder}
          />
          {showPasswordBtn && (
            <p className={styles.showPasswordBtn}>{showPasswordBtn}</p>
          )}
        </div>

        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

export default Input;
