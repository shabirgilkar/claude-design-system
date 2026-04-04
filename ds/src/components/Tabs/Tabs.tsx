import React from 'react';
import styles from './Tabs.module.css';

export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsDirection = 'horizontal' | 'vertical';

export interface TabItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  content?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (id: string) => void;
  size?: TabsSize;
  direction?: TabsDirection;
  showIcon?: boolean;
  showDescription?: boolean;
  showDot?: boolean;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActive,
  defaultTab,
  onChange,
  size = 'md',
  direction = 'horizontal',
  showIcon = true,
  showDescription = false,
  showDot = false,
  className,
}) => {
  const [internalActive, setInternalActive] = React.useState(
    defaultTab ?? tabs[0]?.id ?? ''
  );
  const isControlled = controlledActive !== undefined;
  const active = isControlled ? controlledActive : internalActive;

  const listRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({});
  const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  // Update indicator position whenever active tab changes
  React.useLayoutEffect(() => {
    const listEl = listRef.current;
    const activeEl = tabRefs.current.get(active);
    if (!listEl || !activeEl) return;
    const listRect = listEl.getBoundingClientRect();
    const tabRect = activeEl.getBoundingClientRect();

    if (direction === 'vertical') {
      setIndicatorStyle({
        top: tabRect.top - listRect.top,
        height: tabRect.height,
      });
    } else {
      setIndicatorStyle({
        left: tabRect.left - listRect.left,
        width: tabRect.width,
      });
    }
  }, [active, size, direction]);

  const handleClick = (id: string) => {
    if (!isControlled) setInternalActive(id);
    onChange?.(id);
  };

  const activePanel = tabs.find((t) => t.id === active);

  const rootClasses = [
    styles.root,
    styles[size],
    direction === 'vertical' ? styles.vertical : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      <div className={styles.list} role="tablist" ref={listRef}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            aria-disabled={tab.disabled}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
              else tabRefs.current.delete(tab.id);
            }}
            className={`${styles.tab} ${active === tab.id ? styles.active : ''} ${showDescription && tab.description ? styles.descriptive : ''}`}
            onClick={() => !tab.disabled && handleClick(tab.id)}
            tabIndex={tab.disabled ? -1 : undefined}
          >
            {showIcon && tab.icon && <span className={styles.icon} aria-hidden="true">{tab.icon}</span>}
            <span className={styles.labelGroup}>
              <span className={styles.labelRow}>
                {tab.label}
                {showDot && <span className={styles.dot} aria-hidden="true" />}
              </span>
              {showDescription && tab.description && (
                <span className={styles.description}>{tab.description}</span>
              )}
            </span>
          </button>
        ))}
        {/* Sliding indicator */}
        <span
          className={styles.indicator}
          style={indicatorStyle}
          aria-hidden="true"
        />
      </div>
      {activePanel?.content !== undefined && (
        <div
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className={styles.panel}
        >
          {activePanel.content}
        </div>
      )}
    </div>
  );
};
