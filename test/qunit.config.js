/* global requirejs */

// RequireJS config
requirejs.config({
  baseUrl: '.',
  paths: {
    qunit: 'node_modules/qunit/qunit/qunit',
    jquery: 'node_modules/jquery/dist/jquery',
    gemini: '../dist/gemini',
    lodash: '../node_modules/lodash/lodash.min',
    'jquery.boiler': '../node_modules/jquery-boiler/jquery.boiler',
    'gemini.support': '../node_modules/gemini-support/gemini.support',
  },
});
