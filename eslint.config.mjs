import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // The cyber HUD intentionally renders "//" labels as text nodes
      // throughout the interface (section eyebrows, panel headers).
      "react/jsx-no-comment-textnodes": "off",
    },
  },
];

export default eslintConfig;
