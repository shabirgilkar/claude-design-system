import React from 'react';
import styles from './Toggle.module.css';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: ToggleSize;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  'aria-label'?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  labelPosition = 'right',
  size = 'md',
  disabled = false,
  id,
  name,
  value,
  'aria-label': ariaLabel,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  const inputId = id ?? (label ? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const wrapperClasses = [
    styles.wrapper,
    styles[size],
    checked && styles.on,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={wrapperClasses} htmlFor={inputId}>
      {label && labelPosition === 'left' && (
        <span className={styles.labelText}>{label}</span>
      )}
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        className={styles.input}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        value={value}
        aria-label={ariaLabel ?? label}
        aria-checked={checked}
      />
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
      {label && labelPosition === 'right' && (
        <span className={styles.labelText}>{label}</span>
      )}
    </label>
  );
};
