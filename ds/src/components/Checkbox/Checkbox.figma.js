// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=80-24704
// source=ds/src/components/Checkbox/Checkbox.tsx
// component=Checkbox
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
  Checked: 'checked',
  Indeterminate: 'indeterminate',
  Error: 'error',
  Disabled: 'disabled',
})

export default {
  example: figma.tsx`<Checkbox
  size="${size}"
  label="Checkbox label"${state === 'checked' ? `\n  checked` : ''}${state === 'indeterminate' ? `\n  indeterminate` : ''}${state === 'disabled' ? `\n  disabled` : ''}${state === 'error' ? `\n  error` : ''}
/>`,
  imports: ['import { Checkbox } from "@ds/components/Checkbox"'],
  id: 'checkbox',
  metadata: { nestable: true },
}
