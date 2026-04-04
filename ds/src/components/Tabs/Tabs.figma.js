// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=PLACEHOLDER
// source=ds/src/components/Tabs/Tabs.tsx
// component=Tabs
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
const showIcon = instance.getBoolean('ShowIcon')
const showDescription = instance.getBoolean('ShowDescription')
const showDot = instance.getBoolean('ShowDot')

export default {
  example: figma.tsx`<Tabs
    size="${size}"
    direction="${direction}"
    showIcon={${showIcon}}
    showDescription={${showDescription}}
    showDot={${showDot}}
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
