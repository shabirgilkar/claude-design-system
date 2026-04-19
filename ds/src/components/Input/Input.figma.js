// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=15-7857
// source=ds/src/components/Input/Input.tsx
// component=Input (TextInput variant set)
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
  Typing: '',
  Filled: '',
  Error: 'error',
  Disabled: 'disabled',
  ReadOnly: 'readonly',
})

export default {
  example: figma.tsx`<Input
  size="${size}"
  label="Label"
  placeholder="Placeholder"${state === 'error' ? `\n  error="Please enter a valid value"` : ''}${state === 'disabled' ? `\n  disabled` : ''}${state === 'readonly' ? `\n  readOnly` : ''}
/>`,
  imports: ['import { Input } from "@ds/components/Input"'],
  id: 'input',
  metadata: { nestable: true },
}
