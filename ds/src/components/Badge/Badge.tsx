import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'brand';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'pill' | 'rect';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  dot?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  shape = 'pill',
  dot = false,
  icon,
  children,
  className,
}) => {
  const classes = [
    styles.badge,
    styles[variant],
    styles[size],
    styles[shape],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {!dot && icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
};
