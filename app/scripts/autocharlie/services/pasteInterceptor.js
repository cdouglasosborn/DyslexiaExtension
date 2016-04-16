'use strict';

var autocharlie = autocharlie || {};
autocharlie.services = autocharlie.services || {};


autocharlie.services.PasteInterceptor = function(elem, callback, propagate) {
  this.elem = elem;
  this.callback = callback;
  this.propagate = propagate || false;
};


autocharlie.services.PasteInterceptor.prototype.addEventListener = function() {
  this.elem.addEventListener('paste', function(e) {
    if(!this.propagate) {
      e.preventDefault();
    }
    var text = (e.originalEvent || e).clipboardData.getData('text/html') || '';
    this.callback(text);
  }.bind(this), false);
};