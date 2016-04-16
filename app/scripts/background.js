'use strict';


var autocharlie = autocharlie || {};
autocharlie.constants = autocharlie.constants || {};

autocharlie.constants.CLASS_NAME_PREFIX = 'autocharlie-material-content-';

autocharlie.constants.ClassName = {
  MODAL_HEADER: autocharlie.constants.CLASS_NAME_PREFIX + 'header',
  MODAL_FOOTER: autocharlie.constants.CLASS_NAME_PREFIX + 'footer',
  MODAL_CONTENT: autocharlie.constants.CLASS_NAME_PREFIX + 'content',
  MODAL_CONTAINER: autocharlie.constants.CLASS_NAME_PREFIX + 'container',
  FAB: autocharlie.constants.CLASS_NAME_PREFIX + 'fab',
  CARD: autocharlie.constants.CLASS_NAME_PREFIX + 'card',
  LIGHT_BOX: autocharlie.constants.CLASS_NAME_PREFIX + 'lightbox',
  DARK_BOX: autocharlie.constants.CLASS_NAME_PREFIX + 'darkbox',
  BUTTON: autocharlie.constants.CLASS_NAME_PREFIX + 'button',
  LEFT_ICON_CONTAINER: autocharlie.constants.CLASS_NAME_PREFIX + 'left-icon-container',
  RIGHT_ICON_CONTAINER: autocharlie.constants.CLASS_NAME_PREFIX + 'right-icon-container',
  INNER_HEADER: autocharlie.constants.CLASS_NAME_PREFIX + 'inner-header',
  RIGHT_ICON: autocharlie.constants.CLASS_NAME_PREFIX + 'right-icon',
  LEFT_ICON: autocharlie.constants.CLASS_NAME_PREFIX + 'left-icon',
  TABS_CONTAINER: autocharlie.constants.CLASS_NAME_PREFIX + 'tabs',
  TAB: autocharlie.constants.CLASS_NAME_PREFIX + 'tab',
  TAB_INDICATOR: autocharlie.constants.CLASS_NAME_PREFIX + 'tab-indicator',
  TABS_DIVS_CONTAINER: autocharlie.constants.CLASS_NAME_PREFIX + 'tabs-div-container',
  TABS_DIV: autocharlie.constants.CLASS_NAME_PREFIX + 'tabs-div',
  TABS_DIVS_INNER: autocharlie.constants.CLASS_NAME_PREFIX + 'tabs-div-inner',
  PADDING: autocharlie.constants.CLASS_NAME_PREFIX + 'padding'
};


var autocharlie = autocharlie || {};
autocharlie.constants = autocharlie.constants || {};

autocharlie.constants.Copy = {
  SUBMIT_FEEDBACK: 'Submit Feedback',
  SEND: 'Send',
  FEEDBACK: 'Feedback',
  EMAIL_ADDRESS: 'Email Address'
};


var autocharlie = autocharlie || {};
autocharlie.constants = autocharlie.constants || {};


autocharlie.constants.ID_NAME_PREFIX = 'autocharlie-material-content-';

autocharlie.constants.Id = {
  HEADER_CONTAINER: autocharlie.constants.ID_NAME_PREFIX + 'header',
  FOOTER_CONTAINER: autocharlie.constants.ID_NAME_PREFIX + 'footer',
  CONTENT_CONTAINER: autocharlie.constants.ID_NAME_PREFIX + 'content',
  FEEBACK_INPUT: autocharlie.constants.ID_NAME_PREFIX + 'feedback-input',
  FEEBACK_EMAIL: autocharlie.constants.ID_NAME_PREFIX + 'feedback-email'
};


var autocharlie = autocharlie || {};
autocharlie.constants = autocharlie.constants || {};


autocharlie.constants.IMAGE_FOLDER = 'images/';

autocharlie.constants.Images = {
  HEADER_LOGO: autocharlie.constants.IMAGE_FOLDER + 'Logo.png',
  HEADER_HAMBURGER: autocharlie.constants.IMAGE_FOLDER + 'Header_Hamburger.png',
  HEADER_CLOSE: autocharlie.constants.IMAGE_FOLDER + 'Header_Close.png',
  HEADER_FEEDBACK: autocharlie.constants.IMAGE_FOLDER + 'Header_Feedback.png'
};




var autocharlie = autocharlie || {};
autocharlie.constants = autocharlie.constants || {};

autocharlie.constants.Message = {
  SEND_FEEDBACK: 'sendFeedback'
};




var autocharlie = autocharlie || {};
autocharlie.constants = autocharlie.constants || {};

autocharlie.constants.Names = {
  APP: 'MultiSignature'
};




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


//Namespace for TTS
var autocharlie = autocharlie || {};
autocharlie.ui = autocharlie.ui || {};

autocharlie.ui.Tabs = function(insertionDiv, tabDetails) {
  this.insertionDiv = insertionDiv;
  this.tabDetails = tabDetails;
  this.tabsContainer = document.createElement('ul');
  this.tabsContainer.className = autocharlie.constants.ClassName.TABS_CONTAINER;

  for(var i = 0; i < this.tabDetails.length; i++) {
    this.createTabButton(i);
  }
  this.indicator = document.createElement('div');
  this.indicator.className = autocharlie.constants.ClassName.TAB_INDICATOR;
  this.indicator.style.width = 100 / this.tabDetails.length + '%';
  this.indicator.style.left = '0px';
  this.tabsContainer.appendChild(this.indicator);
  this.insertionDiv.appendChild(this.tabsContainer);

  this.tabsDivContainer = document.createElement('div');
  this.tabsDivContainer.className = autocharlie.constants.ClassName.TABS_DIVS_CONTAINER;
  this.tabsDivContainer.style.width = '100%';

  this.tabsInnerDivContainer = document.createElement('div');
  this.tabsInnerDivContainer.className = autocharlie.constants.ClassName.TABS_DIVS_INNER;
  this.tabsInnerDivContainer.style.width = 100 * tabDetails.length + '%';

  this.tabsDivContainer.appendChild(this.tabsInnerDivContainer);

  for(var j = 0; j < tabDetails.length; j++) {
    var actualTab = tabDetails[j];
    var actualTabDiv = document.createElement('div');
    tabDetails[j].containerDiv = actualTabDiv;
    actualTabDiv.className = autocharlie.constants.ClassName.TABS_DIV;
    actualTabDiv.appendChild(actualTab.div);
    actualTabDiv.style.width = 100 / tabDetails.length + '%';
    //actualTabDiv.style.left = 100 / tabDetails.length * j + '%';
    actualTabDiv.style.left = '0%';
    this.tabsInnerDivContainer.appendChild(actualTabDiv);
  }
  this.insertionDiv.appendChild(this.tabsDivContainer);
};


autocharlie.ui.Tabs.prototype.createTabButton = function(i) {
    var tab = this.tabDetails[i];
    var tabDiv = document.createElement('li');
    this.tabDetails.button = tabDiv;
    tabDiv.className = autocharlie.constants.ClassName.TAB;
    tabDiv.innerHTML = tab.name;
    tabDiv.style.width = 100 / this.tabDetails.length + '%';
    this.tabsContainer.appendChild(tabDiv);
    tabDiv.addEventListener('click', function() {
      //this.indicator.style.left = i * (100 / this.tabDetails.length) + '%';
      var y = i * (100 / this.tabDetails.length);
      //this.indicator.style.transform = 'translate3d(' + y + '%, 0px, 0px)';
      this.indicator.style.left = y + '%';
      //this.tabsInnerDivContainer.style.marginRight = i * 100 + '%';
      var x = i * (100 / this.tabDetails.length);
      this.tabsInnerDivContainer.style.transform = 'translate3d(-' + x + '%, 0px, 0px)';
    }.bind(this));
  };


var dyslexiaextension = dyslexiaextension || {};
dyslexiaextension.constants = dyslexiaextension.constants || {};

dyslexiaextension.constants.Message = {
  TURN_ON_FONT: 'turnOnFont',
  TURN_OFF_FONT: 'turnOffFont',
  GET_FONT: 'getFont',
  SEND_FEEDBACK: 'sendFeedback',
  TURN_ON_BACKGROUND: 'turnOnBackground',
  TURN_OFF_BACKGROUND: 'turnOffBackground',
  GET_BACKGROUND: 'getBackground',
  TURN_ON_READING: 'turnOnReading',
  TURN_OFF_READING: 'turnOffReading',
  GET_READING: 'getReading',
  GET_INIT: 'getInit'
};


var dyslexiaextension = dyslexiaextension || {};

//Chrome Detections
chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
  if(details.reason === 'install') {
    chrome.tabs.create({url: "http://www.dyslexiaextension.com/firstinstall.html"}, function (tab) {
        console.log("New tab launched with http://yoursite.com/");
    });
  }
});

dyslexiaextension.Background = function() {
};

dyslexiaextension.Background.EndPoints = {
  FEEDBACK: 'http://www.startuppilots.com/api/feedback'
};

dyslexiaextension.Background.LocalStorageLocations = {
  FONT: 'Font',
  BACKGROUND: 'Background',
  READING: 'Reading'
}

dyslexiaextension.Background.PRODUCT_NAME = 'Dyslexia Extension';

dyslexiaextension.Background.prototype.init = function() {
  //Detect when user changes tabs
  chrome.tabs.onSelectionChanged.addListener(this.selectionChange.bind(this));

  //Detect Button Click
  chrome.browserAction.onClicked.addListener(this.browserActionClicked);

  //Detect Messages
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    this.receivedMessage(request, sender, sendResponse);
  }.bind(this));

  this.font = localStorage[
    dyslexiaextension.Background.LocalStorageLocations.FONT];
  if(!this.font || this.font === null || this.font === undefined) {
    //TODO: Get from some server.
    this.font = '';
  } else {
    this.font = JSON.parse(this.font);
  }


  this.background = localStorage[
    dyslexiaextension.Background.LocalStorageLocations.BACKGROUND];
  if(!this.background || this.background === null || this.background === undefined) {
    //TODO: Get from some server.
    this.background = '';
  } else {
    this.background = JSON.parse(this.background);
  }


  this.reading = localStorage[
    dyslexiaextension.Background.LocalStorageLocations.READING];
  if(!this.reading || this.reading === null || this.reading === undefined) {
    //TODO: Get from some server.
    this.reading = '';
  } else {
    this.reading = JSON.parse(this.reading);
  }
  
  console.log(this.reading);

  //Get User if user is signed in.
};

dyslexiaextension.Background.prototype.selectionChange = function(tabId) {
  this.currentTabId = tabId;
};

dyslexiaextension.Background.prototype.browserActionClicked = function() {
  //Send signal to current tab that it has been clicked
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log('Browser Action Clicked');
    chrome.tabs.sendMessage(tabs[0].id, {'method': 'browserActionClicked'}, function(){
    });
  });
};



dyslexiaextension.Background.prototype.receivedMessage = function(request, sender, sendResponse) {
  switch(request.method) {
    case dyslexiaextension.constants.Message.GET_INIT:
      sendResponse(this.getInit());
      break;
    case dyslexiaextension.constants.Message.GET_BACKGROUND:
      sendResponse(this.getBackground());
      break;
    case dyslexiaextension.constants.Message.GET_FONT:
      sendResponse(this.getFont());
      break;
    case dyslexiaextension.constants.Message.TURN_ON_FONT:
      sendResponse(this.turnOnFont(request.font));
      break;
    case dyslexiaextension.constants.Message.TURN_OFF_FONT:
      sendResponse(this.turnOffFont());
      break;
    case dyslexiaextension.constants.Message.TURN_ON_BACKGROUND:
      sendResponse(this.turnOnBackground(request.color));
      break;
    case dyslexiaextension.constants.Message.TURN_OFF_BACKGROUND:
      sendResponse(this.turnOffBackground());
      break;
    case dyslexiaextension.constants.Message.TURN_ON_READING:
      sendResponse(this.turnOnReading());
      break;
    case dyslexiaextension.constants.Message.TURN_OFF_READING:
      sendResponse(this.turnOffReading());
      break;
    case autocharlie.constants.Message.SEND_FEEDBACK:
      sendResponse(this.sendFeedback(request.feedback));
      break;
    default:

  }
};

dyslexiaextension.Background.prototype.getInit = function() {
  var returnResponse = {
    font: this.getFont(),
    background: this.getBackground(),
    reading: this.getReading()
  }
  return returnResponse;
};

dyslexiaextension.Background.prototype.getFont = function() {
  return this.font;
};

dyslexiaextension.Background.prototype.getBackground = function() {
  return this.background;
};

dyslexiaextension.Background.prototype.getReading = function() {
  return this.reading;
};

dyslexiaextension.Background.prototype.turnOnFont = function(font) {
  console.log('Turning on font');
  console.log(font);
  this.font = font;
  localStorage[
    dyslexiaextension.Background.LocalStorageLocations.FONT] =
      JSON.stringify(font);
};

dyslexiaextension.Background.prototype.turnOnBackground = function(color) {
  console.log('Turning on color');
  console.log(color);
  this.color = color;
  localStorage[
    dyslexiaextension.Background.LocalStorageLocations.BACKGROUND] =
      JSON.stringify(color);
};


dyslexiaextension.Background.prototype.turnOnReading = function() {
  console.log('Turning on reading');
  this.reading = true;
  localStorage[
    dyslexiaextension.Background.LocalStorageLocations.READING] =
      "true";
};

dyslexiaextension.Background.prototype.turnOffReading = function() {
  console.log('Turning off reading');
  this.reading = false;
  localStorage[
    dyslexiaextension.Background.LocalStorageLocations.READING] =
      "false";
};

dyslexiaextension.Background.prototype.turnOffFont = function() {
  this.font = '';
  localStorage[
    dyslexiaextension.Background.LocalStorageLocations.FONT] =
      '';
};

dyslexiaextension.Background.prototype.turnOffBackground = function() {
  this.background = '';
  localStorage[
    dyslexiaextension.Background.LocalStorageLocations.BACKGROUND] =
      '';
};

dyslexiaextension.Background.prototype.sendFeedback = function(feedback) {
  var sendFeedback = {
    'productType': dyslexiaextension.Background.PRODUCT_NAME,
    'email': feedback.email,
    'feedback': feedback.feedback
  };
  $.ajax({
      type: 'POST',
      url: dyslexiaextension.Background.Endpoints.FEEDBACK,
      data: sendFeedback,
      dataType: 'json',
      async: false
    }).done(function() {
    }).fail(function() {
    });
};

var dyslexiaextensionBackground = new dyslexiaextension.Background();
dyslexiaextensionBackground.init();