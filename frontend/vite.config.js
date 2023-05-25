import { defineConfig } from "vite";
export default defineConfig({
  resolve: {
    alias: {
      web3: "web3/dist/web3.min.js",
    },

    // or
    alias: [
      {
        find: "web3",
        replacement: "web3/dist/web3.min.js",
      },
    ],
  },
});
