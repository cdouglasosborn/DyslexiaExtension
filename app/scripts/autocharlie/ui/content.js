'use strict';

//Namespace for TTS
var autocharlie = autocharlie || {};
autocharlie.ui = autocharlie.ui || {};

autocharlie.ui.Content = function(parent) {
  this.parent = parent;
};

autocharlie.ui.Content.prototype.clear = function() {
  this.content.innerHTML = '';
  return this.content;
};

autocharlie.ui.Content.prototype.remove = function() {
  this.content.parentNode.removeChild(this.content);
};

autocharlie.ui.Content.prototype.get = function() {
  return this.content;
};

autocharlie.ui.Content.prototype.show = function() {
  this.content.style.display = 'block';
};

autocharlie.ui.Content.prototype.hide = function() {
  this.content.style.display = 'none';
};

autocharlie.ui.Content.prototype.init = function() {
  this.content = document.createElement('div');
  this.content.className = autocharlie.constants.ClassName.MODAL_CONTENT;
  this.parent.get().appendChild(this.content);
};