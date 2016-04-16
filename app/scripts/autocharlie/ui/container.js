'use strict';

//Namespace
var autocharlie = autocharlie || {};
autocharlie.ui = autocharlie.ui || {};

/**
 * Container Class for injecting a Material Design Container onto the stage.
 * @param body
 */
autocharlie.ui.Container = function(body) {
  this.containerDiv = document.createElement('div');
  this.header = new autocharlie.ui.Header(this);
  this.content = new autocharlie.ui.Content(this);
  this.footer = new autocharlie.ui.Footer(this);

  this.containerDiv.className = autocharlie.constants.ClassName.MODAL_CONTAINER;
  body.appendChild(this.containerDiv);

  this.header.init();
  this.content.init();
  this.footer.init();

  this.header.setHeader(autocharlie.constants.Names.APP);

  return this;
};

autocharlie.ui.Container.prototype.show = function() {
  this.containerDiv.style.display = 'block';
};

autocharlie.ui.Container.prototype.hide = function() {
  this.containerDiv.style.display = 'none';
};

autocharlie.ui.Container.prototype.get = function() {
  return this.containerDiv;
};

autocharlie.ui.Container.prototype.getHeader = function() {
  return this.header;
};

autocharlie.ui.Container.prototype.getContent = function() {
  return this.content;
};

autocharlie.ui.Container.prototype.getFooter = function() {
  return this.footer;
};

