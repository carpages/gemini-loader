/* global requirejs */

// RequireJS config
requirejs.config({
  baseUrl: '.',
  paths: {
    gemini: '../dist/gemini',
    qunit: 'node_modules/qunit/qunit/qunit',
    lodash: 'node_modules/lodash/lodash.min',
    jquery: 'node_modules/jquery/dist/jquery',
    'jquery.boiler': 'node_modules/jquery-boiler/jquery.boiler',
    'gemini.support': 'node_modules/gemini-support/gemini.support',
  },
});
