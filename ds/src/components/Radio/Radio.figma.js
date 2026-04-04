// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=PLACEHOLDER
// source=ds/src/components/Radio/Radio.tsx
// component=Radio
const figma = require('figma')
const instance = figma.selectedInstance

const label = instance.getString('Label')
const description = instance.getString('Description')
const checked = instance.getBoolean('Checked')
const disabled = instance.getBoolean('Disabled')

export default {
  example: figma.tsx`<Radio
    label="${label}"
    description="${description}"
    checked={${checked}}
    disabled={${disabled}}
  />`,
  imports: ['import { Radio } from "@ds/components/Radio"'],
  id: 'radio',
  metadata: { nestable: true },
}
