/**
 * @fileoverview

Loads the main Gemini object and helper functions

 *
 * @namespace gemini.loader
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 */
define([], function(){

  var GEM = window.GEM || {};

  var Gemini = window.Gemini || window.GEM;

  /**
   * Get query paramaters from a URL
   *
   * @method
   * @name gemini.loader#qp
   * @param {string} str The URL to extract (optional)
   * @return {object} A JSON object of the parameters
  **/
  // https://github.com/youbastard/getQueryParameters
  GEM.qp = function(str) {
    return (str || document.location.search)
      .replace(/(^\?)/,'')
      .split("&")
      .map(function(n){
        return n = n.split("="),this[n[0]] = n[1],this;
      }
      .bind({}))[0];
  };

  return GEM;

});
