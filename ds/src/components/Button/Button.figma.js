// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=10-1181
// source=ds/src/components/Button/Button.tsx
// component=Button
const figma = require('figma')
const instance = figma.selectedInstance

const variant = instance.getEnum('Type', {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Destructive: 'destructive',
  Ghost: 'ghost',
})
const size = instance.getEnum('Size', {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
})
const state = instance.getEnum('State', {
  Default: '',
  Hover: '',
  Focused: '',
  Pressed: '',
  Disabled: 'disabled',
  Loading: 'loading',
  Error: '',
})
const label = instance.getString('Label')

export default {
  example: figma.tsx`<Button
  variant="${variant}"
  size="${size}"${state === 'disabled' ? `\n  disabled` : ''}${state === 'loading' ? `\n  loading` : ''}
>
  ${label || 'Button'}
</Button>`,
  imports: ['import { Button } from "@ds/components/Button"'],
  id: 'button',
  metadata: { nestable: true },
}
