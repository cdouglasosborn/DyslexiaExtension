'use strict';

//Namespace for TTS
var autocharlie = autocharlie || {};
autocharlie.ui = autocharlie.ui || {};

autocharlie.ui.Header = function(parent) {
  this.parent = parent;
};

autocharlie.ui.Header.prototype.clear = function() {
  this.innerHeader.innerHTML = '';
  this.clearIcons();
  return this.header;
};

autocharlie.ui.Header.prototype.remove = function() {
  this.header.parentNode.removeChild(this.header);
};

autocharlie.ui.Header.prototype.setHeader = function(content) {
  if(content === autocharlie.constants.Names.APP) {
    this.innerHeader.innerHTML = '';
    var newLogo = document.createElement('img');
    newLogo.src = chrome.extension.getURL(autocharlie.constants.Images.HEADER_LOGO);
    this.innerHeader.appendChild(newLogo);
  } else {
    this.innerHeader.innerHTML = content;
  }
  return this.header;
};

autocharlie.ui.Header.prototype.clearIcons = function() {
  this.leftIcons.innerHTML = '';
  this.rightIcons.innerHTML = '';
};

autocharlie.ui.Header.prototype.addMenuBtn = function(callback) {
  this.addLeftIcon(autocharlie.constants.Images.HAMBURGER, callback);
};

autocharlie.ui.Header.prototype.addLeftIcon = function(iconUrl, optCallback, optClass) {
  var newIcon = document.createElement('img');
  var additionalClass = '';
  if(optClass) { additionalClass += ' ' + optClass; }
  newIcon.className = autocharlie.constants.ClassName.LEFT_ICON + additionalClass;
  newIcon.src = chrome.extension.getURL(iconUrl);
  newIcon.addEventListener('click', optCallback);
  this.leftIcons.appendChild(newIcon);
  return newIcon;
};

autocharlie.ui.Header.prototype.addCloseButton = function(callback) {
  return this.addLeftIcon(autocharlie.constants.Images.HEADER_CLOSE, callback);
};

autocharlie.ui.Header.prototype.addFeedbackButton = function() {
  this.addRightIcon(
    autocharlie.constants.Images.HEADER_FEEDBACK,
    function() {
      this.lightbox = new autocharlie.ui.LightBox(this.parent.get());
      var feedbackInput = document.createElement('div');
      console.log('ids');
      console.log(autocharlie.constants.Id);
      var details = new autocharlie.ui.Input(
        autocharlie.constants.Copy.FEEDBACK, autocharlie.constants.Id.FEEDBACK_INPUT);
      feedbackInput.appendChild(details.get());
      var email = new autocharlie.ui.Input(
        autocharlie.constants.Copy.EMAIL_ADDRESS, autocharlie.constants.Id.FEEDBACK_EMAIL);
      feedbackInput.appendChild(email.get());
      var submitButton = document.createElement('button');
      submitButton.className = autocharlie.constants.ClassName.BUTTON;
      submitButton.innerHTML = autocharlie.constants.Copy.SEND;
      submitButton.addEventListener('click', function() {
        var gottenEmail = document.getElementById(autocharlie.constants.Id.FEEDBACK_EMAIL).value;
        console.log(gottenEmail);
        var gottenFeedback = document.getElementById(autocharlie.constants.Id.FEEDBACK_INPUT).value;
        var createdFeedback = {
          'email': gottenEmail,
          'feedback': gottenFeedback
        };
        console.log(createdFeedback);
        chrome.runtime.sendMessage({
          method: autocharlie.constants.Message.SEND_FEEDBACK,
          feedback: createdFeedback
        }, function(response) {
          console.log(response);
          this.lightbox.remove();
        }.bind(this));
      }.bind(this), false);
      feedbackInput.appendChild(submitButton);
      this.lightbox.init(
        feedbackInput,
        autocharlie.constants.Copy.SUBMIT_FEEDBACK);
    }.bind(this)
    );
};

autocharlie.ui.Header.prototype.addRightIcon = function(iconUrl, optCallback, optClass) {
  var newIcon = document.createElement('img');
  var additionalClass = '';
  if(optClass) { additionalClass += ' ' + optClass; }
  newIcon.className = autocharlie.constants.ClassName.RIGHT_ICON + additionalClass;
  newIcon.src = chrome.extension.getURL(iconUrl);
  newIcon.addEventListener('click', optCallback);
  this.rightIcons.appendChild(newIcon);
  return newIcon;
};

autocharlie.ui.Header.prototype.init = function() {
  this.header = document.createElement('div');
  this.header.className = autocharlie.constants.ClassName.MODAL_HEADER;
  this.header.id = autocharlie.constants.Id.HEADER_CONTAINER;
  this.parent.get().appendChild(this.header);

  this.leftIcons = document.createElement('div');
  this.leftIcons.className = autocharlie.constants.ClassName.LEFT_ICON_CONTAINER;
  this.leftIcons.id = autocharlie.constants.Id.HEADER_LEFT_ICONS;
  this.header.appendChild(this.leftIcons);

  this.innerHeader = document.createElement('div');
  this.innerHeader.className = autocharlie.constants.ClassName.INNER_HEADER;
  this.innerHeader.id = autocharlie.constants.Id.INNER_HEADER;
  this.header.appendChild(this.innerHeader);

  this.rightIcons = document.createElement('div');
  this.rightIcons.className = autocharlie.constants.ClassName.RIGHT_ICON_CONTAINER;
  this.rightIcons.id = autocharlie.constants.Id.HEADER_RIGHT_ICONS;
  this.header.appendChild(this.rightIcons);
};

autocharlie.ui.Header.prototype.get = function() {
  return this.header;
};
