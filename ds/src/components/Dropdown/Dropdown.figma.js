// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=18-3473
// source=ds/src/components/Dropdown/Dropdown.tsx
// component=Dropdown
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
  Open: '',
  Selected: '',
  Error: 'error',
  Disabled: 'disabled',
  ReadOnly: 'readonly',
})

export default {
  example: figma.tsx`<Dropdown
  size="${size}"
  label="Label"
  placeholder="Select an option"${state === 'disabled' ? `\n  disabled` : ''}${state === 'readonly' ? `\n  readOnly` : ''}${state === 'error' ? `\n  error="Please select a value"` : ''}
  options={[
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' },
  ]}
/>`,
  imports: ['import { Dropdown } from "@ds/components/Dropdown"'],
  id: 'dropdown',
  metadata: { nestable: true },
}
