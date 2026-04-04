/**
 * Tier 3 — Component Tokens
 *
 * Component-specific tokens that alias Semantic tokens.
 * Chain: Component → Semantic → Primitives → raw value
 *
 * Each component token file is self-contained and covers:
 *   color (per state), size, spacing, radius, border, typography, opacity
 */

export { buttonTokens } from './button';
export type { ButtonTokens } from './button';

export { inputTokens } from './input';
export type { InputTokens } from './input';

export { checkboxTokens } from './checkbox';
export type { CheckboxTokens } from './checkbox';

export { radioTokens } from './radio';
export type { RadioTokens } from './radio';

export { toggleTokens } from './toggle';
export type { ToggleTokens } from './toggle';

export { badgeTokens } from './badge';
export type { BadgeTokens } from './badge';

export { avatarTokens } from './avatar';
export type { AvatarTokens } from './avatar';

export { toastTokens } from './toast';
export type { ToastTokens } from './toast';

export { tooltipTokens } from './tooltip';
export type { TooltipTokens } from './tooltip';

export { tabsTokens } from './tabs';
export type { TabsTokens } from './tabs';

export { dropdownTokens } from './dropdown';
export type { DropdownTokens } from './dropdown';

export { textareaTokens } from './textarea';
export type { TextareaTokens } from './textarea';

import { buttonTokens } from './button';
import { inputTokens } from './input';
import { checkboxTokens } from './checkbox';
import { radioTokens } from './radio';
import { toggleTokens } from './toggle';
import { badgeTokens } from './badge';
import { avatarTokens } from './avatar';
import { toastTokens } from './toast';
import { tooltipTokens } from './tooltip';
import { tabsTokens } from './tabs';
import { dropdownTokens } from './dropdown';
import { textareaTokens } from './textarea';

export const components = {
  button: buttonTokens,
  input: inputTokens,
  checkbox: checkboxTokens,
  radio: radioTokens,
  toggle: toggleTokens,
  badge: badgeTokens,
  avatar: avatarTokens,
  toast: toastTokens,
  tooltip: tooltipTokens,
  tabs: tabsTokens,
  dropdown: dropdownTokens,
  textarea: textareaTokens,
} as const;
