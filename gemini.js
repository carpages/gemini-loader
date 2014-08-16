/**
 * @fileoverview

Loads the main Gemini object which acts as a jquery wrapper.

This modules accomplishes the following:

- [Load jquery without clobbering the global namespace](http://stackoverflow.com/questions/4858431/use-requirejs-and-jquery-without-clobbering-global-jquery/9593868#9593868)
- Load [jquery-boiler](https://github.com/mattdrose/jquery-boiler)
- Load underscore.js which can be accessed in ``$._``
- Load helpers
- Cache commonly used elements

 *
 * @namespace gemini
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires jquery
 * @requires jquery.boiler
 * @requires underscore
 * @requires gemini.support
 *
 *
 * @example
  console.log($===G); //true
  G('#element').css('color','green').trigger('colorChange');
 *
 */

define(['underscore', 'jquery', 'gemini.support', 'jquery.boiler'], function(_, $, support){

  var G = window.G || {};

  //Store any data
  $.D = G.D || {};

  //Copy jquery
  G = window.G = $;

  //Add function to run queued JS
  G.Q = function(){
    if(!G.D._qj) return;
    _.each(G.D._qj, function(callback){
      callback.call();
    });
  };

  //Store underscore.js
  $._ = _;

  //Store reference to support object
  G.support = support;

  /******************************************
   * DOM HELPERS
   ******************************************/

  /**
   * Load custom dom helper to the jquery namespace
   *
   * @private
   * @method
   * @name gemini#_domHelper
   * @param {string} namespace The namespace of the helper (should start with underscore)
   * @param {function} helper The helper function
   * @return {type} Array of jQuery objects
  **/
  $._domHelper = function(namespace, helper){
    $.fn[namespace] = function(){
      var args = arguments;
      return this.each(function(){
        helper.apply(this, args);
      });
    };
  };

  /**
   * Show a dom element using the hidden class
   * *Note:* This is useful in edge cases where you don't want to actually
   * display:none the element
   *
   * @private
   * @method
   * @name gemini#_show
  **/
  $._domHelper('_show', function(){

    $(this).removeClass('hidden');

  });

  /**
   * Hide a dom element using the hidden class
   * *Note:* This is useful in edge cases where you don't want to actually
   * display:none the element
   *
   * @private
   * @method
   * @name gemini#_hide
  **/
  $._domHelper('_hide', function(){

    $(this).addClass('hidden');

  });

  /**
   * Fade in a dom element using the hidden class
   * *Note:* This is useful in edge cases where you don't want to actually
   * display:none the element
   *
   * @private
   * @method
   * @name gemini#_fadeIn
  **/
  $._domHelper('_fadeIn', function(time){

    $(this).css({opacity: 0})
           ._show()
           .fadeTo(time, 1);

  });

  /**
   * Fade out a dom element using the hidden class
   * *Note:* This is useful in edge cases where you don't want to actually
   * display:none the element
   *
   * @private
   * @method
   * @name gemini#_fadeOut
  **/
  $._domHelper('_fadeOut', function(time){

    $this = $(this);
    $this.css({opacity: 1})
      .fadeTo(time, 0, function(){
        $this._hide();
      });

  });

  /**
   * A custom class to fit images to the size of the container sent. It uses
   * the .fit class, therefore the dom element being fitted is required to have
   * this class.
   *
   * @private
   * @method
   * @name gemini#_fit
   * @param {domElement} context The context to fit the item to. Defaults to
   * window
  **/
  $._domHelper('_fit', function(context){
    var $context;
    if (_.isUndefined(context)) {
      $context = $window;
    } else {
      $context = $(context);
    }

    var $this = $(this);
    if (!$this.hasClass('fit')) return;

    $this.css({
      padding: ($context.height()/$context.width() * 100 / 2) + '% 0'
    });
  });

  /******************************************
   * CACHE COMMON OBJECTS
   ******************************************/

  /**
   * Window cache
   *
   * @name gemini#$window
   * @type object
   */
  window.$window = $.window = $(window);
  /**
   * Document cache
   *
   * @name gemini#$document
   * @type object
   */
  window.$document = $.document = $(document);

  /******************************************
   * VANILLA HELPERS
   ******************************************/

  /**
   * Get query paramaters from a URL
   *
   * @method
   * @name gemini#qp
   * @param {string} str The URL to extract (optional)
   * @return {object} A JSON object of the parameters
  **/
  // https://github.com/youbastard/getQueryParameters
  $.qp = function(str) {
    return (str || document.location.search)
      .replace(/(^\?)/,'')
      .split("&")
      .map(function(n){
        return n = n.split("="),this[n[0]] = n[1],this;
      }
      .bind({}))[0];
  };

  return $;

});
