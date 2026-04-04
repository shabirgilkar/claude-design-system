// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=PLACEHOLDER
// source=ds/src/components/Toggle/Toggle.tsx
// component=Toggle
const figma = require('figma')
const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
})
const label = instance.getString('Label')
const labelPosition = instance.getEnum('LabelPosition', {
  Left: 'left',
  Right: 'right',
})
const checked = instance.getBoolean('Checked')
const disabled = instance.getBoolean('Disabled')

export default {
  example: figma.tsx`<Toggle
    size="${size}"
    label="${label}"
    labelPosition="${labelPosition}"
    checked={${checked}}
    disabled={${disabled}}
  />`,
  imports: ['import { Toggle } from "@ds/components/Toggle"'],
  id: 'toggle',
  metadata: { nestable: true },
}
