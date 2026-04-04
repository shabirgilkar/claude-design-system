// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=PLACEHOLDER
// source=ds/src/components/Tooltip/Tooltip.tsx
// component=Tooltip
const figma = require('figma')
const instance = figma.selectedInstance

const theme = instance.getEnum('Theme', {
  Dark: 'dark',
  Light: 'light',
})
const placement = instance.getEnum('Placement', {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
})
const content = instance.getString('Content')
const disabled = instance.getBoolean('Disabled')

export default {
  example: figma.tsx`<Tooltip
    theme="${theme}"
    placement="${placement}"
    content="${content}"
    disabled={${disabled}}
  >
    <button>Hover me</button>
  </Tooltip>`,
  imports: ['import { Tooltip } from "@ds/components/Tooltip"'],
  id: 'tooltip',
  metadata: { nestable: true },
}
