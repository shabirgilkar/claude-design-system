import React from 'react';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import styles from './ThemeToggle.module.css';

export type ThemeToggleSize = 'sm' | 'md' | 'lg';

interface ThemeToggleProps {
  size?: ThemeToggleSize;
  className?: string;
}

const SunIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoonIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.003 8.003 0 1010.586 10.586z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 'md', className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`${styles.toggle} ${styles[size]}${className ? ` ${className}` : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className={`${styles.icon} ${theme === 'dark' ? styles.active : ''}`}>
        <MoonIcon />
      </span>
      <span className={`${styles.icon} ${theme === 'light' ? styles.active : ''}`}>
        <SunIcon />
      </span>
    </button>
  );
};
