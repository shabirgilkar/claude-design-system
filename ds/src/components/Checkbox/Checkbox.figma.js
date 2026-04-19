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
const label = instance.getString('Label')
const description = instance.getString('Description')
const checked = instance.getBoolean('Checked')
const indeterminate = instance.getBoolean('Indeterminate')
const disabled = instance.getBoolean('Disabled')

export default {
  example: figma.tsx`<Checkbox
    size="${size}"
    label="${label}"
    description="${description}"
    checked={${checked}}
    indeterminate={${indeterminate}}
    disabled={${disabled}}
  />`,
  imports: ['import { Checkbox } from "@ds/components/Checkbox"'],
  id: 'checkbox',
  metadata: { nestable: true },
}
