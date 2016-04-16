'use strict';

//Namespace for TTS
var autocharlie = autocharlie || {};
autocharlie.ui = autocharlie.ui || {};

autocharlie.ui.Fab = function(parent) {
  this.parent = parent;
};

autocharlie.ui.Fab.prototype.clear = function() {
  this.content.innerHTML = '';
  return this.content;
};

autocharlie.ui.Fab.prototype.remove = function() {
  this.content.parentNode.removeChild(this.content);
};

autocharlie.ui.Fab.prototype.get = function() {
  return this.content;
};

autocharlie.ui.Fab.prototype.show = function() {
  this.content.style.display = 'block';
};

autocharlie.ui.Fab.prototype.hide = function() {
  this.content.style.display = 'none';
};

autocharlie.ui.Fab.prototype.init = function(callback) {
  this.content = document.createElement('div');
  this.content.innerHTML = '+';
  this.content.className = autocharlie.constants.ClassName.FAB;
  this.parent.get().appendChild(this.content);
  if(callback) {
    this.content.addEventListener('click', callback, false);
  }
};