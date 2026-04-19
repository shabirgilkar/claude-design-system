// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=80-26853
// source=ds/src/components/Toggle/Toggle.tsx
// component=Toggle
const figma = require('figma')
const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
})
const state = instance.getEnum('State', {
  Default: '',
  Hover: '',
  Focused: '',
  Active: 'active',
  Error: 'error',
  Disabled: 'disabled',
})

export default {
  example: figma.tsx`<Toggle
  size="${size}"
  label="Toggle label"${state === 'active' ? `\n  checked` : ''}${state === 'disabled' ? `\n  disabled` : ''}${state === 'error' ? `\n  error` : ''}
/>`,
  imports: ['import { Toggle } from "@ds/components/Toggle"'],
  id: 'toggle',
  metadata: { nestable: true },
}
