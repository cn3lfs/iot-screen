//craco.config.js
const path = require("path");

const tsconfig = require("./tsconfig.paths.json");

const removeAsterisk = (path) => path.replace("/*", "");

// 添加alias, 方便使用绝对路径访问
const aliasProps = Object.entries(tsconfig.compilerOptions.paths).map(
  ([key, value]) => {
    const newKey = removeAsterisk(key);
    let newValue = removeAsterisk(value[0]);
    newValue = path.resolve(__dirname, newValue);
    return [newKey, newValue];
  }
);

const alias = Object.fromEntries(aliasProps);
// 替换momentjs
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  webpack: {
    alias,
    plugins: [new AntdDayjsWebpackPlugin()],
  },
};
