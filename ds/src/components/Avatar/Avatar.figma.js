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
  '2XL': '2xl',
})
const color = instance.getEnum('Color', {
  Purple: 'purple',
  Pink: 'pink',
  Red: 'red',
  Green: 'green',
  Blue: 'blue',
})
const src = instance.getString('Src')
const alt = instance.getString('Alt')
const initials = instance.getString('Initials')

export default {
  example: figma.tsx`<Avatar
    size="${size}"
    color="${color}"
    src="${src}"
    alt="${alt}"
    initials="${initials}"
  />`,
  imports: ['import { Avatar } from "@ds/components/Avatar"'],
  id: 'avatar',
  metadata: { nestable: true },
}
