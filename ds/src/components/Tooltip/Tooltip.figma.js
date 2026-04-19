// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=83-39300
// source=ds/src/components/Tooltip/Tooltip.tsx
// component=Tooltip
const figma = require('figma')
const instance = figma.selectedInstance

const placement = instance.getEnum('Position', {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
})
const theme = instance.getEnum('Style', {
  Dark: 'dark',
  Light: 'light',
})
const type = instance.getEnum('Type', {
  Simple: 'simple',
  Descriptive: 'descriptive',
})

export default {
  example: figma.tsx`<Tooltip
  placement="${placement}"
  theme="${theme}"
  content="Tooltip content"${type === 'descriptive' ? `\n  title="Tooltip title"` : ''}
>
  <button>Hover me</button>
</Tooltip>`,
  imports: ['import { Tooltip } from "@ds/components/Tooltip"'],
  id: 'tooltip',
  metadata: { nestable: true },
}
