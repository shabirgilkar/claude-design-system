import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      pill = false,
      fullWidth = false,
      loading = false,
      iconOnly = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.btn,
      styles[variant],
      styles[size],
      pill && styles.pill,
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      iconOnly && styles.iconOnly,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {!loading && leftIcon && <span className={styles.icon} aria-hidden="true">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className={styles.icon} aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
