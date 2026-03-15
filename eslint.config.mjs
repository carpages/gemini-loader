import { URL, fileURLToPath } from 'node:url';

import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import babelParser from '@babel/eslint-parser';
import carpagesConfig from 'eslint-config-carpages/flat';
import globals from 'globals';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig([
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-env'],
        },
      },
    },
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  carpagesConfig,
  js.configs.recommended,
]);
