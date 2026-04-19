// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=83-40444
// source=ds/src/components/Tabs/Tabs.tsx
// component=Tabs (TabItem variant set)
const figma = require('figma')
const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
})
const direction = instance.getEnum('Direction', {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
})

export default {
  example: figma.tsx`<Tabs
  size="${size}"
  direction="${direction}"
  tabs={[
    { id: 'tab-1', label: 'Tab 1' },
    { id: 'tab-2', label: 'Tab 2' },
    { id: 'tab-3', label: 'Tab 3' },
  ]}
/>`,
  imports: ['import { Tabs } from "@ds/components/Tabs"'],
  id: 'tabs',
  metadata: { nestable: true },
}
