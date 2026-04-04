import React from 'react';
import styles from './Tooltip.module.css';

export type TooltipTheme = 'dark' | 'light';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  theme?: TooltipTheme;
  placement?: TooltipPlacement;
  disabled?: boolean;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  theme = 'dark',
  placement = 'top',
  disabled = false,
  delay = 300,
}) => {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && !disabled && (
        <span
          role="tooltip"
          className={`${styles.tooltip} ${styles[theme]} ${styles[placement]}`}
        >
          {content}
        </span>
      )}
    </span>
  );
};
