module.exports = {
  env: {
    test: {
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: false,
            helpers: true,
            regenerator: true,
            useESModules: false,
          },
        ],
      ],
    },
  },
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [],
}
