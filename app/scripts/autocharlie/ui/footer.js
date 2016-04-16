'use strict';

//Namespace for TTS
var autocharlie = autocharlie || {};
autocharlie.ui = autocharlie.ui || {};

autocharlie.ui.Footer = function(parent) {
  this.parent = parent;
};

autocharlie.ui.Footer.prototype.clear = function() {
  this.modalFooter.innerHTML = '';
  return this.modalFooter;
};

autocharlie.ui.Footer.prototype.remove = function() {
  this.modalFooter.parentNode.removeChild(this.modalFooter);
};

autocharlie.ui.Footer.prototype.get = function() {
  return this.modalFooter;
};

autocharlie.ui.Footer.prototype.show = function() {
  this.modalFooter.style.display = 'block';
};

autocharlie.ui.Footer.prototype.hide = function() {
  this.modalFooter.style.display = 'none';
};

autocharlie.ui.Footer.prototype.init = function() {
  this.modalFooter = document.createElement('div');
  this.modalFooter.className = autocharlie.constants.ClassName.MODAL_FOOTER;
  this.modalFooter.id = autocharlie.constants.Id.FOOTER_CONTAINER;
  this.parent.get().appendChild(this.modalFooter);
};