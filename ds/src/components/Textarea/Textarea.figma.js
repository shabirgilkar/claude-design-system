// url=https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=56-914
// source=ds/src/components/Textarea/Textarea.tsx
// component=Textarea
const figma = require('figma')
const instance = figma.selectedInstance

const label = instance.getString('Label')
const hint = instance.getString('Hint')
const error = instance.getString('Error')
const placeholder = instance.getString('Placeholder')
const required = instance.getBoolean('Required')
const disabled = instance.getBoolean('Disabled')
const showCharCount = instance.getBoolean('ShowCharCount')
const resize = instance.getBoolean('Resize')

export default {
  example: figma.tsx`<Textarea
    label="${label}"
    hint="${hint}"
    error="${error}"
    placeholder="${placeholder}"
    required={${required}}
    disabled={${disabled}}
    showCharCount={${showCharCount}}
    resize={${resize}}
  />`,
  imports: ['import { Textarea } from "@ds/components/Textarea"'],
  id: 'textarea',
  metadata: { nestable: true },
}
