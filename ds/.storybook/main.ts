import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-designs',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.base = '/claude-design-system/storybook/';
    return config;
  },
};

export default config;
