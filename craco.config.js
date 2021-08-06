const path = require("path");
// 替换momentjs
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    plugins: [new AntdDayjsWebpackPlugin()],
  },
};
