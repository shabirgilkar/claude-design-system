// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=80-29300
// source=ds/src/components/Badge/Badge.tsx
// component=Badge
const figma = require('figma')
const instance = figma.selectedInstance

const variant = instance.getEnum('Type', {
  Neutral: 'neutral',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
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

export default {
  example: figma.tsx`<Badge
  variant="${variant}"
  size="${size}"
  shape="${shape}"
>
  Label
</Badge>`,
  imports: ['import { Badge } from "@ds/components/Badge"'],
  id: 'badge',
  metadata: { nestable: true },
}
