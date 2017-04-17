'use strict';

module.exports = function( grunt ) {
  // Load all grunt tasks
  require( 'load-grunt-tasks' )( grunt );
  // Show elapsed time at the end
  require( 'time-grunt' )( grunt );

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON( 'package.json' ),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed MIT */\n',
    // Task configuration.
    qunit: {
      all: {
        options: {
          inject: [
            './test/qunit.config.js',
            './node_modules/grunt-contrib-qunit/phantomjs/bridge.js'
          ],
          urls: [ 'http://localhost:9000/test/<%= pkg.name %>.test.html' ],
          page: {
            viewportSize: { width: 1280, height: 800 }
          }
        }
      }
    },
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: [ 'gemini.js' ]
    },
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 9000
        }
      }
    },
    'saucelabs-qunit': {
      all: {
        options: {
          testname: '<%= pkg.name %>',
          urls: [ 'http://localhost:9000/test/<%= pkg.name %>.test.html' ],
          build: process.env.TRAVIS_JOB_ID || 'dev-grunt-local:' + Date.now(),
          tags: [ 'v<%= pkg.version %>', 'grunt-saucelabs' ],
          throttled: 5,
          browsers: [
            // Mobile
            { browserName: 'iphone' },
            { browserName: 'android' },

            // Safari
            { browserName: 'safari', version: '10' },
            { browserName: 'safari', version: '9' },
            { browserName: 'safari', version: '8' },

            // Firefox
            { platform: 'mac 10.12', browserName: 'firefox', version: 'latest' },

            // Chrome
            { platform: 'mac 10.12', browserName: 'chrome', version: 'latest' },

            // IE
            { browserName: 'internet explorer', version: 'latest' },
            { browserName: 'internet explorer', version: '10' }
          ]
        }
      }
    }
  });

  // Default Task
  grunt.registerTask( 'default', [ 'eslint', 'test:qunit' ]);

  // Testing Tasks
  grunt.registerTask( 'test:all', [ 'connect', 'qunit', 'saucelabs-qunit' ]);
  grunt.registerTask( 'test:qunit', [ 'connect', 'qunit' ]);
  grunt.registerTask( 'test:saucelabs', [ 'connect', 'saucelabs-qunit' ]);

  // CI Task
  grunt.registerTask( 'ci', [ 'eslint', 'test:all' ]);
};
