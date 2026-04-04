import React from 'react';
import styles from './Dropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
}

const ChevronDown = () => (
  <svg viewBox="0 0 16 16" fill="none" className={styles.chevron}>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 14 14" fill="none" className={styles.optionCheck}>
    <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  placeholder = 'Select…',
  label,
  disabled = false,
  onChange,
  className,
  id,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const [open, setOpen] = React.useState(false);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const inputId = id ?? (label ? `dropdown-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const select = (optionValue: string) => {
    if (!isControlled) setInternalValue(optionValue);
    onChange?.(optionValue);
    setOpen(false);
  };

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Keyboard nav
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div className={`${styles.wrapper} ${open ? styles.open : ''} ${className ?? ''}`} ref={wrapperRef}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <button
        id={inputId}
        type="button"
        className={styles.trigger}
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={!selectedOption ? styles.placeholder : undefined}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown />
      </button>
      {open && (
        <div className={styles.panel} role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              key={option.value}
              role="option"
              type="button"
              aria-selected={option.value === value}
              className={`${styles.option} ${option.value === value ? styles.optionSelected : ''} ${option.disabled ? styles.optionDisabled : ''}`}
              onClick={() => !option.disabled && select(option.value)}
              disabled={option.disabled}
            >
              {option.icon && <span aria-hidden="true">{option.icon}</span>}
              {option.label}
              {option.value === value && <Check />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
