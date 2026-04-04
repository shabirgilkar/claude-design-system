import React from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  maxLength?: number;
  showCharCount?: boolean;
  resize?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      hint,
      error,
      maxLength,
      showCharCount = false,
      resize = true,
      required,
      id,
      value,
      defaultValue,
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(
      () => String(value ?? defaultValue ?? '').length
    );
    const inputId = id ?? (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const isOver = maxLength !== undefined && charCount > maxLength;

    const wrapperClasses = [
      styles.wrapper,
      error && styles.error,
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
        <textarea
          ref={ref}
          id={inputId}
          className={`${styles.textarea} ${!resize ? styles.noResize : ''}`}
          maxLength={maxLength}
          aria-invalid={!!error}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...props}
        />
        {(error || hint || (showCharCount && maxLength !== undefined)) && (
          <div className={styles.footer}>
            {error ? (
              <p className={styles.errorMessage} role="alert">{error}</p>
            ) : hint ? (
              <p className={styles.hint}>{hint}</p>
            ) : (
              <span />
            )}
            {showCharCount && maxLength !== undefined && (
              <span className={`${styles.charCount} ${isOver ? styles.charCountOver : ''}`}>
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
