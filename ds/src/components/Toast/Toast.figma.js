// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=81-38255
// source=ds/src/components/Toast/Toast.tsx
// component=ToastPreview
const figma = require('figma')
const instance = figma.selectedInstance

const variant = instance.getEnum('Type', {
  Success: 'success',
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
  Neutral: 'neutral',
})

export default {
  example: figma.tsx`<ToastPreview
  variant="${variant}"
  title="Toast title"
  description="Toast description message"
/>`,
  imports: ['import { ToastPreview } from "@ds/components/Toast"'],
  id: 'toast',
  metadata: { nestable: true },
}
