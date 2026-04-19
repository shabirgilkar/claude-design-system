// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=10-1181
// source=ds/src/components/Button/Button.tsx
// component=Button
const figma = require('figma')
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Destructive: 'destructive',
  Ghost: 'ghost',
})
const size = instance.getEnum('Size', {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
})
const pill = instance.getBoolean('Pill')
const fullWidth = instance.getBoolean('FullWidth')
const loading = instance.getBoolean('Loading')
const iconOnly = instance.getBoolean('IconOnly')
const disabled = instance.getBoolean('Disabled')
const label = instance.getString('Label')

export default {
  example: figma.tsx`<Button
  variant="${variant}"
  size="${size}"${pill ? `\n  pill` : ''}${fullWidth ? `\n  fullWidth` : ''}${loading ? `\n  loading` : ''}${iconOnly ? `\n  iconOnly` : ''}${disabled ? `\n  disabled` : ''}
>
  ${label}
</Button>`,
  imports: ['import { Button } from "@ds/components/Button"'],
  id: 'button',
  metadata: { nestable: true },
}
