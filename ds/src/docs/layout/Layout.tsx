import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import { ThemeToggle } from '../../components/ThemeToggle';

interface NavItem {
  path: string;
  label: string;
  dot?: 'success' | 'warning' | 'error' | 'info' | 'brand';
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const NAV: NavSection[] = [
  {
    label: 'Getting Started',
    items: [
      { path: '/', label: 'Overview' },
      { path: '/tokens', label: 'Design Tokens' },
      { path: '/colors', label: 'Color Palette' },
      { path: '/typography', label: 'Typography' },
      { path: '/spacing', label: 'Spacing & Sizing' },
      { path: '/icons', label: 'Icons' },
    ],
  },
  {
    label: 'Components',
    items: [
      { path: '/components/button', label: 'Button', dot: 'success' },
      { path: '/components/badge', label: 'Badge', dot: 'success' },
      { path: '/components/input', label: 'Input', dot: 'success' },
      { path: '/components/textarea', label: 'Textarea', dot: 'success' },
      { path: '/components/dropdown', label: 'Dropdown', dot: 'success' },
      { path: '/components/checkbox', label: 'Checkbox', dot: 'success' },
      { path: '/components/radio', label: 'Radio', dot: 'success' },
      { path: '/components/toggle', label: 'Toggle', dot: 'success' },
      { path: '/components/avatar', label: 'Avatar', dot: 'success' },
      { path: '/components/tabs', label: 'Tabs', dot: 'success' },
      { path: '/components/tooltip', label: 'Tooltip', dot: 'success' },
      { path: '/components/toast', label: 'Toast', dot: 'success' },
    ],
  },
];

export const COMPONENT_COUNT = NAV.find(s => s.label === 'Components')?.items.length ?? 0;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className={styles.outer}>
      <div className={styles.root}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <NavLink to="/" className={styles.logo}>
            <span className={styles.logoBadge}>DS</span>
            <span className={styles.logoText}>Design System</span>
            <span className={styles.logoVersion}>v1.0</span>
          </NavLink>
          <div className={styles.topbarSpacer} />
          <div className={styles.topbarMeta}>
            <span>{COMPONENT_COUNT} components</span>
            <span>·</span>
            <span>1,361 variables</span>
            <span>·</span>
            <span>3-tier tokens</span>
          </div>
          <ThemeToggle size="sm" />
        </header>

        {/* Sidebar */}
        <nav className={styles.sidebar}>
          {NAV.map((section) => (
            <div key={section.label} className={styles.sidebarSection}>
              <p className={styles.sidebarSectionLabel}>{section.label}</p>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ''}`
                  }
                >
                  {item.dot && (
                    <span className={`${styles.sidebarItemDot} ${styles[item.dot]}`} />
                  )}
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Main content */}
        <main className={styles.main} key={location.pathname}>
          {children}
        </main>
      </div>
    </div>
  );
};
