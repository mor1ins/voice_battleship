/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const metroConfig = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = metroConfig;
//
// const {getDefaultConfig} = require('metro-config');
//
// module.exports = (async () => {
//   const {
//     resolver: {sourceExts},
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-less-transformer'),
//     },
//     resolver: {
//       sourceExts: [...sourceExts, 'less'],
//     },
//   };
// })();
