import React from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarColor = 'purple' | 'pink' | 'red' | 'green' | 'blue';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  color?: AvatarColor;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

const AVATAR_COLORS: AvatarColor[] = ['purple', 'pink', 'red', 'green', 'blue'];

function colorFromInitials(initials: string): AvatarColor {
  const code = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  initials,
  size = 'md',
  color,
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);
  const sizeClass = size === '2xl' ? styles.xxl : styles[size];
  const derivedColor = color ?? (initials ? colorFromInitials(initials) : 'purple');

  const classes = [
    styles.avatar,
    sizeClass,
    !src || imgError ? styles[derivedColor] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} aria-label={alt || initials}>
      {src && !imgError ? (
        <img src={src} alt={alt} className={styles.image} onError={() => setImgError(true)} />
      ) : initials ? (
        <span aria-hidden="true">{initials.slice(0, 2).toUpperCase()}</span>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" width="60%" height="60%">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      )}
    </span>
  );
};

export const AvatarGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`${styles.group} ${className ?? ''}`}>{children}</div>
);

export { getInitials };
