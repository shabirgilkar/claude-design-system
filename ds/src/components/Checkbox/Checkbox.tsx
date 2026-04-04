import React from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  description?: string;
  size?: CheckboxSize;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      size = 'md',
      indeterminate = false,
      checked,
      disabled,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = (node: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    };

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const inputId = id ?? (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const wrapperClasses = [
      styles.wrapper,
      styles[size],
      checked && styles.checked,
      indeterminate && styles.indeterminate,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClasses} htmlFor={inputId}>
        <input
          ref={combinedRef}
          id={inputId}
          type="checkbox"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          {...props}
        />
        <span className={styles.box}>
          {indeterminate ? (
            <svg className={styles.check} viewBox="0 0 10 2" fill="none">
              <line x1="1" y1="1" x2="9" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : checked ? (
            <svg className={styles.check} viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
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

Checkbox.displayName = 'Checkbox';
