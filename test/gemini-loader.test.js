/* global $window, $document */
require([ 'qunit', 'gemini', 'underscore', 'gemini.support' ], function(
  QUnit,
  G,
  underscore,
  support
) {
  QUnit.start();

  // Necessary for SauceLab testing
  var log = [];
  var testName;

  QUnit.done( function( testResults ) {
    var tests = [];
    for ( var i = 0, len = log.length; i < len; i++ ) {
      var details = log[i];
      tests.push({
        name: details.name,
        result: details.result,
        expected: details.expected,
        actual: details.actual,
        source: details.source
      });
    }
    testResults.tests = tests;

    window.global_test_results = testResults;
  });

  QUnit.testStart( function( testDetails ) {
    QUnit.log( function( details ) {
      if ( !details.result ) {
        details.name = testDetails.name;
        log.push( details );
      }
    });
  });

  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      QUnit.module(name, {[setup][ ,teardown]})
      QUnit.test(name, callback)
      QUnit.assert.expect(numberOfAssertions)
      QUnit.stop(increment)
      QUnit.start(decrement)
    Test assertions:
      assert.ok(value, [message])
      assert.equal(actual, expected, [message])
      assert.notEqual(actual, expected, [message])
      assert.assert.deepEqual(actual, expected, [message])
      assert.notDeepEqual(actual, expected, [message])
      assert.strictEqual(actual, expected, [message])
      assert.notStrictEqual(actual, expected, [message])
      assert.throws(block, [expected], [message])
  */

  /*
   * MAIN TOOLS
   */
  QUnit.module( 'Main Tools' );

  QUnit.test( 'Gemini has functionality of jQuery', function( assert ) {
    assert.expect( 1 );

    assert.strictEqual( G, $ );
  });

  QUnit.test( 'Underscore is loaded', function( assert ) {
    assert.expect( 1 );

    assert.strictEqual( G._, underscore );
  });

  QUnit.test( 'Support is loaded', function( assert ) {
    assert.expect( 1 );

    assert.strictEqual( G.support, support );
  });

  QUnit.test(
    'Inline specified Gemini data is copied to Gemini object',
    function( assert ) {
      assert.expect( 1 );

      assert.strictEqual( G.D.hello, 'world!' );
    }
  );

  QUnit.test( 'Queued javascript runs after Gemini is loaded', function( assert ) {
    assert.expect( 2 );

    // Run Queded JS
    G.Q();

    assert.ok( !window.geminiLoadedPre );
    assert.ok( window.geminiLoadedPost );
  });

  QUnit.test( '$window and $document is cached', function( assert ) {
    assert.expect( 2 );

    assert.deepEqual( $document, $( document ));
    assert.deepEqual( $window, $( window ));
  });

  /*
   * DOM HELPER
   */
  QUnit.module( '_domHelper', {
    beforeEach: function() {
      this.$els = $( '#js-fixtures' ).children();

      G._domHelper( '_testHelper', function() {
        $( this ).addClass( 'test-class' );
      });
    }
  });

  QUnit.test( 'Added to fn namespace', function( assert ) {
    assert.expect( 1 );

    assert.ok( !!G.fn._testHelper );
  });

  QUnit.test( 'Chainable', function( assert ) {
    assert.expect( 1 );

    assert.strictEqual( this.$els._testHelper(), this.$els );
  });

  QUnit.test( "Apply's helper to each element", function( assert ) {
    assert.expect( 1 );

    var passed = true;

    this.$els.each( function() {
      if ( !$( this ).hasClass( 'test-class' )) {
        passed = false;
      }
    });

    assert.ok( passed );
  });

  /*
   * DOM Helpers
   */
  QUnit.module( 'DOM Helpers', {
    beforeEach: function() {
      this.$el = $( '#js-toHide' );
    }
  });

  function isInView( elem ) {
    var docViewTop = $( document ).scrollTop();
    var docViewBottom = docViewTop + $( document ).height();

    var elemTop = $( elem ).offset().top;
    var elemBottom = elemTop + $( elem ).height();

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }

  QUnit.test( '_hide removes the element', function( assert ) {
    assert.expect( 3 );

    assert.ok( isInView( this.$el[0]));
    this.$el._hide();
    assert.ok( !isInView( this.$el[0]));

    assert.notEqual( this.$el.css( 'display' ), 'none' ); // Doesn't give display:none
  });

  QUnit.test( '_show shows the element', function( assert ) {
    assert.expect( 2 );

    this.$el._hide();
    assert.ok( !isInView( this.$el[0]));
    this.$el._show();
    assert.ok( isInView( this.$el[0]));
  });

  /*
   * Fit Helper
   */
  QUnit.module( 'Fit Helper', {
    beforeEach: function() {
      this.$el = $( '#js-fit' );
      this.$wrap = $( '#js-fit-context' );
    }
  });

  QUnit.test( 'Covers the full window by default', function( assert ) {
    assert.expect( 2 );

    this.$el._fit();

    assert.ok( Math.abs( this.$el.outerWidth() - $window.width()) < 50 );
    assert.ok( Math.abs( this.$el.outerHeight() - $window.height()) < 50 );
  });

  QUnit.test( 'Covers sent context', function( assert ) {
    assert.expect( 2 );

    this.$wrap.width( 500 );
    this.$wrap.height( 200 );
    this.$el._fit( this.$wrap[0]);

    assert.ok( Math.abs( this.$el.outerWidth() - 500 ) < 50 );
    assert.ok( Math.abs( this.$el.outerHeight() - 200 ) < 50 );
  });

  /*
   * Vanilla Helpers
   */
  QUnit.module( 'Vanilla Helpers' );

  QUnit.test( 'qp returns query parameter object or URL', function( assert ) {
    assert.expect( 1 );

    assert.deepEqual( G.qp( '?a=200&b=300' ), {
      a: '200',
      b: '300'
    });
  });
});
