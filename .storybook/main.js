const path = require("path");

module.exports = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: "@storybook/addon-postcss",
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: '[local]',
          },
        },
        postcssLoaderOptions: {
          implementation: require("postcss")
        },
      }
    }
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.modules = [
      path.resolve(__dirname, ".."),
      "node_modules",
    ]
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "../src"),
    };
    return config;
  },
};
