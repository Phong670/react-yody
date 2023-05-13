// module.exports = {
//   resolve: {
//     fallback: {
//       buffer: require.resolve("buffer/"),
//       zlib: require.resolve("browserify-zlib"),
//       querystring: require.resolve("querystring-es3"),
//       path: require.resolve("path-browserify"),
//       crypto: require.resolve("crypto-browserify"),
//       stream: require.resolve("stream-browserify"),
//       url: require.resolve("url/"),
//       http: require.resolve("stream-http"),
//     },
//   },
// };
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // Other rules...
  plugins: [new NodePolyfillPlugin()],
};
