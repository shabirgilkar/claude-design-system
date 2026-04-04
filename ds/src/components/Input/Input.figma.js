// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=PLACEHOLDER
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
const leftIcon = instance.findInstance('LeftIcon')
const rightIcon = instance.findInstance('RightIcon')

export default {
  example: figma.tsx`<Input
    size="${size}"
    label="${label}"
    hint="${hint}"
    error="${error}"
    placeholder="${placeholder}"
    required={${required}}
    disabled={${disabled}}
    leftIcon={${leftIcon}}
    rightIcon={${rightIcon}}
  />`,
  imports: ['import { Input } from "@ds/components/Input"'],
  id: 'input',
  metadata: { nestable: true },
}
