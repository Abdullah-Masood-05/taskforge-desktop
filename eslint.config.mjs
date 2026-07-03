import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    "dist/**",
    "node_modules/**",
    "src-tauri/target/**",
    "src-tauri/gen/**",
  ]),
]);

export default eslintConfig;
