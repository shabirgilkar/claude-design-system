// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=80-25865
// source=ds/src/components/Radio/Radio.tsx
// component=Radio
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
  Selected: 'selected',
  Error: 'error',
  Disabled: 'disabled',
})

export default {
  example: figma.tsx`<Radio
  size="${size}"
  label="Radio label"${state === 'selected' ? `\n  checked` : ''}${state === 'disabled' ? `\n  disabled` : ''}${state === 'error' ? `\n  error` : ''}
/>`,
  imports: ['import { Radio } from "@ds/components/Radio"'],
  id: 'radio',
  metadata: { nestable: true },
}
