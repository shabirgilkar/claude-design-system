import React from 'react';
import styles from './Toast.module.css';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';

export interface ToastItem {
  id: string;
  variant?: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastProps extends ToastItem {
  onDismiss: (id: string) => void;
}

/* ── Variant icons ─────────────────────────────────────────────────────── */
const VariantIcon: React.FC<{ variant: ToastVariant }> = ({ variant }) => {
  const size = 16;
  const shared = { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', className: styles.variantIcon };

  switch (variant) {
    case 'success':
      return (
        <svg {...shared} aria-hidden="true">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Z" fill="currentColor" opacity="0.15" />
          <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'error':
      return (
        <svg {...shared} aria-hidden="true">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Z" fill="currentColor" opacity="0.15" />
          <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'warning':
      return (
        <svg {...shared} aria-hidden="true">
          <path d="M7.13 2.5a1 1 0 0 1 1.74 0l5.5 9.5A1 1 0 0 1 13.5 13.5h-11A1 1 0 0 1 1.63 12l5.5-9.5Z" fill="currentColor" opacity="0.15" />
          <path d="M8 6v3M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'info':
      return (
        <svg {...shared} aria-hidden="true">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Z" fill="currentColor" opacity="0.15" />
          <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

const ToastCard: React.FC<ToastProps> = ({
  id,
  variant = 'neutral',
  title,
  description,
  duration = 4000,
  onDismiss,
}) => {
  const [exiting, setExiting] = React.useState(false);

  const handleDismiss = React.useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(id), 200);
  }, [id, onDismiss]);

  React.useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(handleDismiss, duration);
    return () => clearTimeout(t);
  }, [id, duration, handleDismiss]);

  return (
    <div
      className={`${styles.toast} ${styles[variant]} ${exiting ? styles.exiting : ''}`}
      role="alert"
      aria-live="polite"
    >
      <span className={styles.accent} aria-hidden="true" />
      <VariantIcon variant={variant} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <button
        className={styles.closeBtn}
        onClick={handleDismiss}
        aria-label={`Dismiss ${variant} notification`}
      >
        <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

// Toast Provider + hook
interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
      <div className={styles.container} aria-label="Notifications">
        {toasts.map((toast) => (
          <ToastCard key={toast.id} {...toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

// Standalone preview component (for docs)
export const ToastPreview: React.FC<Omit<ToastItem, 'id'>> = ({ variant = 'neutral', title, description }) => (
  <div className={`${styles.toast} ${styles[variant]}`} style={{ position: 'static', animation: 'none', maxWidth: '100%' }}>
    <span className={styles.accent} aria-hidden="true" />
    <VariantIcon variant={variant} />
    <div className={styles.content}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  </div>
);
