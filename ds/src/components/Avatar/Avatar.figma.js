// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=80-29669
// source=ds/src/components/Avatar/Avatar.tsx
// component=Avatar
const figma = require('figma')
const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
})
const type = instance.getEnum('Type', {
  Image: 'image',
  Initials: 'initials',
  Icon: 'icon',
})

export default {
  example: figma.tsx`<Avatar
  size="${size}"
  type="${type}"
/>`,
  imports: ['import { Avatar } from "@ds/components/Avatar"'],
  id: 'avatar',
  metadata: { nestable: true },
}
