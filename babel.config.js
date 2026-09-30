module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@redux': './src/redux',
          '@routes': './src/routes',
          '@config': './src/config',
          '@types': './src/types',
          '@styles': './src/styles',
          '@constants': './src/constants',
        },
      },
    ],
  ],
};
