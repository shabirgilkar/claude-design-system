// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=PLACEHOLDER
// source=ds/src/components/Dropdown/Dropdown.tsx
// component=Dropdown
const figma = require('figma')
const instance = figma.selectedInstance

const label = instance.getString('Label')
const placeholder = instance.getString('Placeholder')
const disabled = instance.getBoolean('Disabled')

export default {
  example: figma.tsx`<Dropdown
    label="${label}"
    placeholder="${placeholder}"
    disabled={${disabled}}
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
