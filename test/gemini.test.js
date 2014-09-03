requirejs.config({
    baseUrl: '../',
    paths: {
      'underscore': 'bower_components/underscore/underscore',
      'jquery': 'bower_components/jquery/dist/jquery',
      'jquery.boiler': 'bower_components/jquery-boiler/jquery.boiler',
      'gemini.support': 'bower_components/gemini-support/gemini.support'
    }
});

require(['gemini', 'underscore', 'gemini.support'], function(G, underscore, support){
  QUnit.start();
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  /*
   * MAIN TOOLS
   */
  module('Main Tools');

  test('Gemini has functionality of jQuery', function() {
    expect(1);

    strictEqual(G, $);
  });

  test('Underscore is loaded', function() {
    expect(1);

    strictEqual(G._, underscore);
  });

  test('Support is loaded', function() {
    expect(1);

    strictEqual(G.support, support);
  });

  test('Inline specified Gemini data is copied to Gemini object', function() {
    expect(1);

    strictEqual(G.D.hello, 'world!');
  });

  test('Queded javascript runs after Gemini is loaded', function() {
    expect(2);

    // Run Queded JS
    G.Q();

    ok(!window.geminiLoadedPre);
    ok(window.geminiLoadedPost);
  });

  test('$window and $document is cached', function() {
    expect(2);

    deepEqual($document, $(document));
    deepEqual($window, $(window));
  });

  /*
   * DOM HELPER
   */
  module('_domHelper', {
    setup: function() {
      this.$els = $('#js-fixtures').children();

      G._domHelper('_testHelper', function() {
        $(this).addClass('test-class');
      });
    }
  });

  test('Added to fn namespace', function() {
    expect(1);

    ok(!!G.fn._testHelper);
  });

  test('Chainable', function() {
    expect(1);

    strictEqual(this.$els._testHelper(), this.$els);
  });

  test("Apply's helper to each element", function() {
    expect(1);

    var passed = true;

    this.$els.each(function(){
      if (!$(this).hasClass('test-class')) {
        passed = false;
      }
    });

    ok(passed);
  });

  /*
   * DOM Helpers
   */
  module('DOM Helpers', {
    setup: function() {
      this.$el = $('#js-toHide');
    }
  });

  function isInView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  test('_hide removes the element', function() {
    expect(3);

    ok( isInView(this.$el[0]) );
    this.$el._hide();
    ok( !isInView(this.$el[0]) );

    notEqual(this.$el.css('display'), 'none'); //Doesn't give display:none
  });

  test('_show shows the element', function() {
    expect(2);

    this.$el._hide();
    ok( !isInView(this.$el[0]) );
    this.$el._show();
    ok( isInView(this.$el[0]) );
  });

  /*
   * Fit Helper
   */
  module('Fit Helper', {
    setup: function() {
      this.$el = $('#js-fit');
      this.$wrap = $('#js-fit-context');
    }
  });

  test('Covers the full window by default', function() {
    expect(2);

    this.$el._fit();

    ok( Math.abs( this.$el.outerWidth() - $window.width() ) < 50 );
    ok( Math.abs( this.$el.outerHeight() - $window.height() ) < 50 );
  });

  test('Covers sent context', function() {
    expect(2);

    this.$wrap.width(500);
    this.$wrap.height(200);
    this.$el._fit(this.$wrap[0]);

    ok( Math.abs( this.$el.outerWidth() - 500 ) < 50 );
    ok( Math.abs( this.$el.outerHeight() - 200 ) < 50 );
  });

  /*
   * Vanilla Helpers
   */
  module('Vanilla Helpers');

  test('qp returns query parameter object or URL', function() {
    expect(1);

    deepEqual(G.qp("?a=200&b=300"), {
      a: "200",
      b: "300"
    });
  });

});
