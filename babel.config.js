module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        globals: ['__scanCodes'],
        alias: {
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@services": "./src/services",
          "@utils": "./src/utils",
          "@constant": "./src/constant",
          "@navigation": "./src/navigation",
          "@redux": "./src/redux",
        }
      }
    ],
    "nativewind/babel"
  ],
};
