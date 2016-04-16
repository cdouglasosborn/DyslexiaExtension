'use strict';

//Namespace for TTS
var autocharlie = autocharlie || {};
autocharlie.ui = autocharlie.ui || {};

autocharlie.ui.Input = function(placeholder, id) {
  this.placeholder = placeholder;
  this.container = document.createElement('div');
  this.id = id;
  this.init();
  return this;
};

autocharlie.ui.Input.ClassName = {
  CONTAINER: 'auto-char-input-container',
  LABEL: 'auto-char-input-label',
  INPUT: 'auto-char-input-input',
  FOCUSED: 'auto-char-input-container-focused'
};

//First we ask what url and then return it to the user
autocharlie.ui.Input.prototype.init = function() {
  this.container.className = autocharlie.ui.Input.ClassName.CONTAINER;
  this.container.innerHTML = '';

  this.label = document.createElement('label');
  this.label.className = autocharlie.ui.Input.ClassName.LABEL;
  this.label.innerHTML = this.placeholder;
  this.container.appendChild(this.label);

  this.input = document.createElement('input');
  this.input.className = autocharlie.ui.Input.ClassName.INPUT;

  console.log('id is');
  console.log(this.id);


  if(this.id) {
    console.log('here');
    this.input.id = this.id;
  }

  this.container.appendChild(this.input);
};


autocharlie.ui.Input.prototype.get = function() {
  return this.container;
};


autocharlie.ui.Input.prototype.getInput = function() {
  return this.input;
};
