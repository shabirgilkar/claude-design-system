/**
 * Primitive Color Tokens
 * Source: Figma › Claude MCP › Variables › Primitives collection
 *
 * Raw hex values — no semantic meaning.
 * Never use these directly in components; reference semantic tokens instead.
 *
 * Scale direction: 100 = lightest, 1000 = darkest, base = brand anchor
 */

export const colorPrimitives = {
  deepPurple: {
    100: '#B4AAC1',
    200: '#9586A8',
    300: '#75628E',
    400: '#5A4377',
    500: '#442A65',
    base: '#3A1F5D',
    700: '#2D1849',
    800: '#221236',
    900: '#170C25',
    1000: '#0E0716',
  },

  crimsonPink: {
    100: '#EAB3C3',
    200: '#E192A9',
    300: '#D87290',
    400: '#D15679',
    500: '#CB4068',
    base: '#C83660',
    700: '#9C2A4B',
    800: '#741F38',
    900: '#501626',
    1000: '#300D17',
  },

  coralRed: {
    100: '#F4BDBA',
    200: '#EFA29D',
    300: '#EA8680',
    400: '#E66E66',
    500: '#E25B52',
    base: '#E15249',
    700: '#AF4039',
    800: '#82302A',
    900: '#5A211D',
    1000: '#361412',
  },

  warmYellow: {
    100: '#FCEEC4',
    200: '#FAE09A', // ~estimated
    300: '#F8D280', // ~estimated
    400: '#F7DA7E',
    500: '#F6D56D',
    base: '#F6D365',
    700: '#C0A54F',
    800: '#A08040', // ~estimated
    900: '#625428',
    1000: '#3D3316', // ~estimated
  },

  mediumGray: {
    100: '#C9C9C9', // ~estimated
    200: '#B3B3B3',
    300: '#9D9D9D',
    400: '#898989',
    500: '#7A7A7A',
    base: '#737373',
    700: '#5A5A5A',
    800: '#434343',
    900: '#2E2E2E',
    1000: '#1A1A1A', // ~estimated
  },

  emeraldGreen: {
    100: '#C6F6D5',
    200: '#9AE6B4',
    300: '#68D391',
    400: '#48BB78',
    500: '#38A169',
    base: '#38A169',
    700: '#276749',
    800: '#22543D',
    900: '#1C4532',
    1000: '#0E2F21',
  },

  steelBlue: {
    100: '#BEE3F8',
    200: '#90CDF4',
    300: '#63B3ED',
    400: '#4299E1',
    500: '#3182CE',
    base: '#3182CE',
    700: '#2C5282',
    800: '#2A4365',
    900: '#1A365D',
    1000: '#0F2949', // ~estimated
  },

  neutral: {
    white: '#FFFFFF',
    black: '#000000',
  },
} as const;

export type ColorPrimitives = typeof colorPrimitives;
