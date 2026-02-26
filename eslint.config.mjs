import { fileURLToPath } from 'node:url';

import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { includeIgnoreFile } from '@eslint/compat';
import babelParser from '@babel/eslint-parser';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));
const compat = new FlatCompat({
  baseDirectory: fileURLToPath(new URL('.', import.meta.url)),
});

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

  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  ...compat.extends('carpages'),
  js.configs.recommended,
]);
