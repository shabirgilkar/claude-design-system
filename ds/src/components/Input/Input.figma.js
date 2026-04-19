// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=15-7857
// source=ds/src/components/Input/Input.tsx
// component=Input
const figma = require('figma')
const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
})
const label = instance.getString('Label')
const hint = instance.getString('Hint')
const error = instance.getString('Error')
const required = instance.getBoolean('Required')
const disabled = instance.getBoolean('Disabled')
const placeholder = instance.getString('Placeholder')

export default {
  example: figma.tsx`<Input
  size="${size}"
  label="${label}"
  placeholder="${placeholder}"
  hint="${hint}"
  error="${error}"${required ? `\n  required` : ''}${disabled ? `\n  disabled` : ''}
/>`,
  imports: ['import { Input } from "@ds/components/Input"'],
  id: 'input',
  metadata: { nestable: true },
}
