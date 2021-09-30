import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "main.js",
  output: {
    file: "main-bundle.js",
    format: "umd",
    name: "main-bundle",
  },
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectories: ["../web-components", "../react-components"],
      },
    }),
  ],
};
