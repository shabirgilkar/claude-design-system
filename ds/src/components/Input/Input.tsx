import React from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      size = 'md',
      leftIcon,
      rightIcon,
      required,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const wrapperClasses = [
      styles.wrapper,
      styles[size],
      error && styles.error,
      leftIcon && styles.hasLeftIcon,
      rightIcon && styles.hasRightIcon,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required} aria-hidden="true">*</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {leftIcon && (
            <span className={styles.iconLeft} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            required={required}
            {...props}
          />
          {rightIcon && (
            <span className={styles.iconRight} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className={styles.hint}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
