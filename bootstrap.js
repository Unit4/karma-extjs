(function(){
  var karmaLoadedFunction = window.__karma__.loaded;
  window.__karma__.loaded = function(){};

  Ext.onReady(function () {
    window.__karma__.loaded = karmaLoadedFunction;
    window.__karma__.loaded();
  });
}());
