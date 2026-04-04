import React from 'react';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export interface RadioGroupProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, checked, disabled, id, className, ...props }, ref) => {
    const inputId = id ?? (label ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const wrapperClasses = [
      styles.wrapper,
      checked && styles.checked,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClasses} htmlFor={inputId}>
        <input
          ref={ref}
          id={inputId}
          type="radio"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          {...props}
        />
        <span className={styles.circle}>
          {checked && <span className={styles.dot} />}
        </span>
        {(label || description) && (
          <span className={styles.content}>
            {label && <span className={styles.labelText}>{label}</span>}
            {description && <span className={styles.description}>{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, children, className }) => (
  <div className={`${styles.group} ${className ?? ''}`} role="radiogroup" aria-label={label}>
    {label && <p className={styles.groupLabel}>{label}</p>}
    {children}
  </div>
);
