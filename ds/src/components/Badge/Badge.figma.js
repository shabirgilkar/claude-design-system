// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=80-29300
// source=ds/src/components/Badge/Badge.tsx
// component=Badge
const figma = require('figma')
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Neutral: 'neutral',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Info: 'info',
  Brand: 'brand',
})
const size = instance.getEnum('Size', {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
})
const shape = instance.getEnum('Shape', {
  Pill: 'pill',
  Rect: 'rect',
})
const dot = instance.getBoolean('Dot')
const icon = instance.findInstance('Icon')
const children = instance.getString('Label')

export default {
  example: figma.tsx`<Badge
    variant="${variant}"
    size="${size}"
    shape="${shape}"
    dot={${dot}}
    icon={${icon}}
  >
    ${children}
  </Badge>`,
  imports: ['import { Badge } from "@ds/components/Badge"'],
  id: 'badge',
  metadata: { nestable: true },
}
