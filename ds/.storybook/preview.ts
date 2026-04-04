import type { Preview } from '@storybook/react-vite';
import '../src/styles/tokens.css';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      document.body.style.backgroundColor =
        theme === 'dark' ? '#0E071C' : '#F8F7FC';
      return Story();
    },
  ],
};

export default preview;
