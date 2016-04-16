'use strict';

//Namespace for TTS
var autocharlie = autocharlie || {};
autocharlie.ui = autocharlie.ui || {};

autocharlie.ui.LightBox = function(container, closeCallback, darkBoxHide) {
  this.container = container;
  this.closeCallback = closeCallback;
  this.darkBoxHide = darkBoxHide || true;
  return this;
};

autocharlie.ui.LightBox.prototype.get = function() {
  return this.lightBox;
};

autocharlie.ui.LightBox.prototype.show = function() {
  this.modalFooter.style.display = 'block';
};

autocharlie.ui.LightBox.prototype.remove = function() {
  this.container.removeChild(this.darkBox);
  this.container.removeChild(this.lightBox);
  if(this.closeCallback) {
    this.closeCallback();
  }
};

autocharlie.ui.LightBox.prototype.init = function(content, headerText) {
  this.lightBox = document.createElement('div');
  this.lightBox.className = autocharlie.constants.ClassName.LIGHT_BOX;
  this.container.appendChild(this.lightBox);
  console.log(headerText);
  if(headerText && headerText !== '') {
    this.header = document.createElement('h3');
    this.headerText = document.createElement('div');
    this.headerText.innerHTML = headerText;
    this.header.appendChild(this.headerText);
    this.lightBox.appendChild(this.header);
  }

  if(content) {
    this.lightBox.appendChild(content);
  }
  this.darkBox = document.createElement('div');
  this.darkBox.className = autocharlie.constants.ClassName.DARK_BOX;

  if(this.darkBoxHide) {
    this.darkBox.addEventListener('click', function() {
      this.remove();
    }.bind(this), false);
  }

  this.container.appendChild(this.darkBox);
};