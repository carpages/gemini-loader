define(['gemini.support'], function(support){

  var GEM = window.GEM || {};

  var Gemini = window.Gemini || window.GEM;

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
