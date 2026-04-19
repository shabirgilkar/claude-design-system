// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=56-914
// source=ds/src/components/Textarea/Textarea.tsx
// component=Textarea (TextArea variant set)
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
  example: figma.tsx`<Textarea
  size="${size}"
  label="Label"
  placeholder="Placeholder"${state === 'error' ? `\n  error="Please enter a valid value"` : ''}${state === 'disabled' ? `\n  disabled` : ''}${state === 'readonly' ? `\n  readOnly` : ''}
/>`,
  imports: ['import { Textarea } from "@ds/components/Textarea"'],
  id: 'textarea',
  metadata: { nestable: true },
}
