import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "eqeqeq": "error",
      "no-inner-declarations": "error",
      "no-trailing-spaces": "error",
      "no-var": "warn",
      "no-implicit-globals": "error"
    }
  },
  {
    // ✅ Конфиг для тестов
    files: ["**/*.test.js", "**/__tests__/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    }
  }
]);
