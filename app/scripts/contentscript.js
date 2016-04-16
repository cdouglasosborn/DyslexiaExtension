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
dyslexiaextension.Constants = dyslexiaextension.Constants || {};


dyslexiaextension.Constants.CLASS_NAME_PREFIX = 'multi-sig-ext-';

dyslexiaextension.Constants.ClassName = {
  EXAMPLE: 'example',
  SIG_HTML: dyslexiaextension.Constants.CLASS_NAME_PREFIX + 'sig-html'
};


var dyslexiaextension = dyslexiaextension || {};
dyslexiaextension.Constants = dyslexiaextension.Constants || {};

dyslexiaextension.Constants.Copy = {
  SIGNATURES: 'Signatures',
  RULES: 'Rules',
  RULES_PREVIEW: 'Here you will be able to set rules as to which signature to use when.' +
    'This is currently in development, if you are interested in this feature please message ' +
    'us using the feedback button in the top right with what you would like rules to do.'
};


var dyslexiaextension = dyslexiaextension || {};
dyslexiaextension.Constants = dyslexiaextension.Constants || {};

dyslexiaextension.Constants.ID_PREFIX = 'multi-sig-ext-';

dyslexiaextension.constants.Ids = {
  TOOLBAR: dyslexiaextension.Constants.CLASS_NAME_PREFIX + 'toobar',
  TEXTAREA: dyslexiaextension.Constants.CLASS_NAME_PREFIX + 'textarea'
};


var dyslexiaextension = dyslexiaextension || {};
dyslexiaextension.Constants = dyslexiaextension.Constants || {};


dyslexiaextension.Constants.IMAGE_DIRECTORY = 'images/';

dyslexiaextension.Constants.Images = {
  HEADER_LOGO: dyslexiaextension.Constants.IMAGE_DIRECTORY + 'Logo.png'
};


var dyslexiaextension = dyslexiaextension || {};
dyslexiaextension.controllers = dyslexiaextension.controllers || {};

dyslexiaextension.controllers.HomeCtrl = function(parent) {
  this.container = parent.container;
  this.parent = parent;
  this.content = this.container.getContent();
  this.currentMessage = parent.currentMessage;
  this.signatureList = null;
};

dyslexiaextension.controllers.HomeCtrl.Copy = {
  HELP: 'Aid',
  EMPATHY: 'Empathy',
  WELCOME: 'Welcome to Dyslexia Extension find below a list of ways to make your internet experience a little easier' +
    ' or select the Empathy tab to experience ways to see through Dyslexics eyes.',
  EMPATHY_WELCOME: 'Although its not possible to truly experience being Dyslexic, feel free to use the tools below to try.',
  FONTS: 'Fonts',
  FONTS_HELP: 'You can add these fonts to every element on the page, either click the "Add" button to add it to one webites or ' +
    ' turn on button which will add it to every website.',
  SCRIPTS: 'Scripts',
  SCRIPTS_HELP: 'These help show dyslexia by jumbling letters around',
  ADD_TO_PAGE: 'Add to Page',
  BACKGROUND_COLOR: 'Background Color Change',
  READING: 'Reading Addon',
  READING_HELP: 'Allows you to read text out aloud from a website and underline each word as its said.'
};

dyslexiaextension.controllers.HomeCtrl.Class = {
  ON_BUTTON: 'on-button',
  OFF_BUTTON: 'off-button',
  BACKGROUND_OFF_BUTTON: 'bg-off-button',
  BACKGROUND_ON_BUTTON: 'bg-on-button'
};

dyslexiaextension.controllers.HomeCtrl.FONTS = [
  {
    font: 'Dyslexia-Extension-LexieReadable-Bold',
    name: 'LexieReadable Bold'
  },
  {
    font: 'Dyslexia-Extension-LexieReadable-Regular',
    name: 'LexieReadable'
  },
  {
    font: 'Dyslexia-Extension-Nisaba',
    name: 'Nisaba'
  },
  {
    font: 'Dyslexia-Extension-OpenDyslexic-Bold',
    name: 'OpenDyslexic Bold'
  },
  {
    font: 'Dyslexia-Extension-OpenDyslexic-BoldItalic',
    name: 'OpenDyslexic Bold Italics'
  },
  {
    font: 'Dyslexia-Extension-OpenDyslexic-Italic',
    name: 'OpenDyslexic Italics'
  },
  {
    font: 'Dyslexia-Extension-OpenDyslexic-Regular',
    name: 'OpenDyslexic'
  },
  {
    font: 'Dyslexia-Extension-OpenDyslexicAlta-Bold',
    name: 'OpenDyslexic Alta Bold'
  },
  {
    font: 'Dyslexia-Extension-OpenDyslexicAlta-BoldItalic',
    name: 'OpenDyslexic Bold Italics'
  },
  {
    font: 'Dyslexia-Extension-OpenDyslexicAlta-Italic',
    name: 'OpenDyslexic Italics'
  },
  {
    font: 'Dyslexia-Extension-OpenDyslexicAlta-Regular',
    name: 'OpenDyslexic Alta'
  },
  {
    font: 'Dyslexia-Extension-OpenDyslexicMono-Regular',
    name: 'OpenDyslexic Mono'
  }
];

dyslexiaextension.controllers.HomeCtrl.PASTEL_COLORS = [
  {
    hex: '#FCFCE9',
    name: 'Yellow'
  },
  {
    hex: '#E7FFDF',
    name: 'Green'
  },
  {
    hex: '#ECF4FF',
    name: 'Blue'
  },
  {
    hex: '#FFEEFB',
    name: 'Pink'
  }
];


dyslexiaextension.controllers.HomeCtrl.EMPATHY_FONTS = [
  {
    font: 'Dyslexia-Extension-DyslexicView',
    name: 'Dyslexic View'
  }
];

dyslexiaextension.controllers.HomeCtrl.Urls = {
  LOG_IN: 'http://www.startuppilots.com/authentication/signin'
};

dyslexiaextension.controllers.HomeCtrl.prototype.init = function() {

  this.container.content.clear();

  this.helpList = document.createElement('div');
  this.helpList.className = autocharlie.constants.ClassName.PADDING;

  this.empathyList = document.createElement('div');
  this.empathyList.className = autocharlie.constants.ClassName.PADDING;

  var tabsInfo = [{
    name: dyslexiaextension.controllers.HomeCtrl.Copy.HELP,
    div: this.helpList,
    active: true
  }, {
    name: dyslexiaextension.controllers.HomeCtrl.Copy.EMPATHY,
    div: this.empathyList,
    active: false
  }];

  var tab = new autocharlie.ui.Tabs(this.content.get(), tabsInfo);

  //Setup user receiver

  this.setupHelpList();
  this.setupEmpathyList();

/*
  this.fab = new autocharlie.ui.Fab(this.container.content);
  this.fab.init(this.checkAffiliate.bind(this)); //TODO Callback
  */
};

dyslexiaextension.controllers.HomeCtrl.prototype.setupHelpList = function() {
  var welcomeText = document.createElement('p');
  welcomeText.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.WELCOME;
  this.helpList.appendChild(welcomeText);
  
  var readingHeader = document.createElement('h2');
  readingHeader.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.READING;
  this.helpList.appendChild(readingHeader);
  
  var readingHelp = document.createElement('p');
  readingHelp.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.READING_HELP;
  this.helpList.appendChild(readingHelp);
  
  var readingContainer = document.createElement('table');
  this.addReading(readingContainer); 
  this.helpList.appendChild(readingContainer);

  var colorHeader = document.createElement('h2');
  colorHeader.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.BACKGROUND_COLOR;
  this.helpList.appendChild(colorHeader);

  var colorContainer = document.createElement('table');
  for(var j = 0; j < dyslexiaextension.controllers.HomeCtrl.PASTEL_COLORS.length; j++) {
    this.addColorToUi(colorContainer, dyslexiaextension.controllers.HomeCtrl.PASTEL_COLORS[j]);
  }
  this.helpList.appendChild(colorContainer);

  var fontHeader = document.createElement('h2');
  fontHeader.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.FONTS;
  this.helpList.appendChild(fontHeader);

  var fontHelp = document.createElement('p');
  fontHelp.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.FONTS_HELP;
  this.helpList.appendChild(fontHelp);

  var fontContainer = document.createElement('table');
  for(var i = 0; i < dyslexiaextension.controllers.HomeCtrl.FONTS.length; i++) {
    this.addFontToUi(fontContainer, dyslexiaextension.controllers.HomeCtrl.FONTS[i]);
  }
  this.helpList.appendChild(fontContainer);
};

dyslexiaextension.controllers.HomeCtrl.prototype.addReading = function(bgContainer) {
  var fontTR = document.createElement('tr');
  bgContainer.appendChild(fontTR);

  var fontTDName = document.createElement('td');
  fontTDName.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.READING;
  fontTR.appendChild(fontTDName);

  var fontActualTDAdd = document.createElement('td');
  fontTR.appendChild(fontActualTDAdd);

  var fontTDAdd = document.createElement('button');
  fontTDAdd.innerHTML = '+';
  fontActualTDAdd.appendChild(fontTDAdd);

  fontTDAdd.addEventListener('click', function() {
    console.log(this.parent);
    this.parent.addReading();
    this.parent.insertOntoBody();
  }.bind(this), false);

  var fontActualTDOn = document.createElement('td');
  fontTR.appendChild(fontActualTDOn);

  var fontTDOn = document.createElement('button');
  fontTDOn.innerHTML = 'ON';
  fontTDOn.className = dyslexiaextension.controllers.HomeCtrl.Class.ON_BUTTON;
  fontActualTDOn.appendChild(fontTDOn);

  if(this.parent.getReading() === true) {
    fontTDOn.style.display = 'none';
  }

  var fontActualTDOff = document.createElement('td');
  fontTR.appendChild(fontActualTDOff);

  var fontTDOff = document.createElement('button');
  fontTDOff.innerHTML = 'OFF';

  if(this.parent.getBackground() !== true) {
    fontTDOff.style.display = 'none';
  }

  fontActualTDOff.appendChild(fontTDOff);
  fontTDOn.addEventListener('click', function() {
    //Apply now
    this.parent.addReading();
    this.parent.insertOntoBody();
    //Save details

      chrome.runtime.sendMessage({
          method: dyslexiaextension.constants.Message.TURN_ON_READING
        }, function() {
          console.log('READING Set');
        });
    //Display off button
    fontTDOn.style.display = 'none';
    fontTDOff.style.display = 'block';
  }.bind(this));

  fontTDOff.addEventListener('click', function() {
    this.parent.removeReading();
    chrome.runtime.sendMessage({
          method: dyslexiaextension.constants.Message.TURN_OFF_READING
        }, function() {
          console.log('READING Removed');
        });
    //Display on button
    fontTDOn.style.display = 'block';
    fontTDOff.style.display = 'none';
  }.bind(this));
};

dyslexiaextension.controllers.HomeCtrl.prototype.addColorToUi = function(bgContainer, backgroundname) {
  var fontTR = document.createElement('tr');
  bgContainer.appendChild(fontTR);

  var fontTDName = document.createElement('td');
  fontTDName.innerHTML = backgroundname.name;
  fontTR.appendChild(fontTDName);

  var fontActualTDAdd = document.createElement('td');
  fontTR.appendChild(fontActualTDAdd);

  var fontTDAdd = document.createElement('button');
  fontTDAdd.innerHTML = '+';
  fontActualTDAdd.appendChild(fontTDAdd);

  fontTDAdd.addEventListener('click', function() {
    console.log(this.parent);
    this.parent.setBackground(backgroundname.hex);
    this.parent.insertOntoBody();
  }.bind(this), false);

  var fontActualTDOn = document.createElement('td');
  fontTR.appendChild(fontActualTDOn);

  var fontTDOn = document.createElement('button');
  fontTDOn.innerHTML = 'ON';
  fontTDOn.className = dyslexiaextension.controllers.HomeCtrl.Class.ON_BUTTON;
  fontActualTDOn.appendChild(fontTDOn);

  if(this.parent.getBackground() === backgroundname.hex) {
    fontTDOn.style.display = 'none';
  }

  var fontActualTDOff = document.createElement('td');
  fontTR.appendChild(fontActualTDOff);

  var fontTDOff = document.createElement('button');
  fontTDOff.innerHTML = 'OFF';

  if(this.parent.getBackground() !== backgroundname.hex) {
    fontTDOff.style.display = 'none';
  }

  fontTDOff.className = dyslexiaextension.controllers.HomeCtrl.Class.BACKGROUND_OFF_BUTTON;
  fontActualTDOff.appendChild(fontTDOff);
  fontTDOn.addEventListener('click', function() {
    //Apply now
    this.parent.setBackground(backgroundname.hex);
    this.parent.insertOntoBody();
    //Save details

      chrome.runtime.sendMessage({
          method: dyslexiaextension.constants.Message.TURN_ON_BACKGROUND,
          color: backgroundname
        }, function() {
          console.log('Color Set');
        });

    //Ensure all other font UIs are set to off
    var onButtons = document.getElementsByClassName(
      dyslexiaextension.controllers.HomeCtrl.Class.BACKGROUND_ON_BUTTON);
    for(var i = 0; i < onButtons.length; i++) {
      onButtons[i].style.display = 'block';
    }

    var offButtons = document.getElementsByClassName(
      dyslexiaextension.controllers.HomeCtrl.Class.BACKGROUND_OFF_BUTTON);
    for(var j = 0; j < offButtons.length; j++) {
      offButtons[j].style.display = 'none';
    }

    //Display off button
    fontTDOn.style.display = 'none';
    fontTDOff.style.display = 'block';
  }.bind(this));

  fontTDOff.addEventListener('click', function() {
    this.parent.removeBackground();

    chrome.runtime.sendMessage({
          method: dyslexiaextension.constants.Message.TURN_OFF_BACKGROUND
        }, function() {
          console.log('Font Removed');
        });
    //Display on button
    fontTDOn.style.display = 'block';
    fontTDOff.style.display = 'none';
  }.bind(this));
};


dyslexiaextension.controllers.HomeCtrl.prototype.addFontToUi = function(fontContainer, fontname) {
  var fontTR = document.createElement('tr');
  fontContainer.appendChild(fontTR);

  var fontTDName = document.createElement('td');
  fontTDName.innerHTML = fontname.name;
  fontTR.appendChild(fontTDName);

  var fontActualTDAdd = document.createElement('td');
  fontTR.appendChild(fontActualTDAdd);

  var fontTDAdd = document.createElement('button');
  fontTDAdd.innerHTML = '+';
  fontActualTDAdd.appendChild(fontTDAdd);

  fontTDAdd.addEventListener('click', function() {
    console.log(this.parent);
    this.parent.setFont(fontname.font);
    this.parent.insertOntoBody();
  }.bind(this), false);

  var fontActualTDOn = document.createElement('td');
  fontTR.appendChild(fontActualTDOn);

  var fontTDOn = document.createElement('button');
  fontTDOn.innerHTML = 'ON';
  fontTDOn.className = dyslexiaextension.controllers.HomeCtrl.Class.ON_BUTTON;
  fontActualTDOn.appendChild(fontTDOn);

  if(this.parent.getFont() === fontname.font) {
    fontTDOn.style.display = 'none';
  }

  var fontActualTDOff = document.createElement('td');
  fontTR.appendChild(fontActualTDOff);

  var fontTDOff = document.createElement('button');
  fontTDOff.innerHTML = 'OFF';

  if(this.parent.getFont() !== fontname.font) {
    fontTDOff.style.display = 'none';
  }

  fontTDOff.className = dyslexiaextension.controllers.HomeCtrl.Class.OFF_BUTTON;
  fontActualTDOff.appendChild(fontTDOff);
  fontTDOn.addEventListener('click', function() {
    //Apply now
    this.parent.setFont(fontname.font);
    this.parent.insertOntoBody();
    //Save details

      chrome.runtime.sendMessage({
          method: dyslexiaextension.constants.Message.TURN_ON_FONT,
          font: fontname
        }, function() {
          console.log('Font Set');
        });

    //Ensure all other font UIs are set to off
    var onButtons = document.getElementsByClassName(
      dyslexiaextension.controllers.HomeCtrl.Class.ON_BUTTON);
    for(var i = 0; i < onButtons.length; i++) {
      onButtons[i].style.display = 'block';
    }

    var offButtons = document.getElementsByClassName(
      dyslexiaextension.controllers.HomeCtrl.Class.OFF_BUTTON);
    for(var j = 0; j < offButtons.length; j++) {
      offButtons[j].style.display = 'none';
    }


    //Display off button
    fontTDOn.style.display = 'none';
    fontTDOff.style.display = 'block';
  }.bind(this));

  fontTDOff.addEventListener('click', function() {
    this.parent.removeFont();

    chrome.runtime.sendMessage({
          method: dyslexiaextension.constants.Message.TURN_OFF_FONT
        }, function() {
          console.log('Font Removed');
        });
    //Display on button
    fontTDOn.style.display = 'block';
    fontTDOff.style.display = 'none';
  }.bind(this));
};

dyslexiaextension.controllers.HomeCtrl.prototype.setupEmpathyList = function() {
  var welcomeText = document.createElement('p');
  welcomeText.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.EMPATHY_WELCOME;
  this.empathyList.appendChild(welcomeText);

  var fontHeader = document.createElement('h2');
  fontHeader.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.FONTS;
  this.empathyList.appendChild(fontHeader);

  var fontHelp = document.createElement('p');
  fontHelp.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.FONTS_HELP;
  this.empathyList.appendChild(fontHelp);

  var fontContainer = document.createElement('table');
  for(var i = 0; i < dyslexiaextension.controllers.HomeCtrl.EMPATHY_FONTS.length; i++) {
    this.addFontToUi(fontContainer, dyslexiaextension.controllers.HomeCtrl.EMPATHY_FONTS[i]);
  }
  this.empathyList.appendChild(fontContainer);

  var scriptHeader = document.createElement('h2');
  scriptHeader.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.SCRIPTS;
  this.empathyList.appendChild(scriptHeader);

  var scriptHelp = document.createElement('p');
  scriptHelp.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.SCRIPTS_HELP;
  this.empathyList.appendChild(scriptHelp);

  var dyslexiaSimulationButton = document.createElement('button');
  dyslexiaSimulationButton.innerHTML = dyslexiaextension.controllers.HomeCtrl.Copy.ADD_TO_PAGE;
  dyslexiaSimulationButton.addEventListener('click', function() {

    var jqueryNode = document.createElement('script');
    jqueryNode.crossorigin = 'anonymous';
    jqueryNode.src = chrome.extension.getURL('scripts/helperscripts/jquery-2.2.2.min.js');

    var headID = document.getElementsByTagName('head')[0];

    jqueryNode.onload = function () {
        //do stuff with the script
        var scriptNode = document.createElement('script');
        scriptNode.src = chrome.extension.getURL('scripts/helperscripts/dyslexiasimulation.js');
        headID.appendChild(scriptNode);
    };

    headID.appendChild(jqueryNode);

  }, false);
  this.empathyList.appendChild(dyslexiaSimulationButton);

};




var dyslexiaextension = dyslexiaextension || {};
dyslexiaextension.modules = dyslexiaextension.modules || {};

dyslexiaextension.modules.Tts = function() {
    this.voices = null;
    this.voice = null;
    this.canHighlightText = true;
    this.elToRead = null;
    this.elBeingRead = null;
    this.textBeingRead = null;
    this.utterance = null;
    this.lastHoveredEl = null;
    this.buttonEl = null;
    this.buttonShown = false;
};

console.log('Read-To-Me: Loaded extension');

dyslexiaextension.modules.Tts.PREFERRED_VOICE_NAME = 'Samantha'; // Good choices on OSX: Samantha (direct), Vicki (soft)
dyslexiaextension.modules.Tts.VOICE_SPEED = 0.80;
dyslexiaextension.modules.Tts.HIGHLIGHT_ID = 'read-to-me-highlight';
dyslexiaextension.modules.Tts.HOVER_DURATION_MS = 1200;

dyslexiaextension.modules.Tts.prototype.init = function() {
  window.speechSynthesis.onvoiceschanged = function() {
    if (this.voices) {
        return;
    }
    console.log('Read-To-Me: Loading voices');
    this.voices = window.speechSynthesis.getVoices();
    console.log('Read-To-Me: Loaded voices'); 
    this.runExtension();
  }.bind(this);  
};



dyslexiaextension.modules.Tts.prototype.runExtension = function() {
  console.log('Read-To-Me: Running extension');
  this.setVoice();
  this.renderButton();
  this.attachListeners();
};


dyslexiaextension.modules.Tts.prototype.setVoice = function() {
  if (this.voice) {
    return;
  }
  
  console.log('Read-To-Me: Setting voice');

  if (!this.voices || this.voices.length === 0) {
    console.log('Read-To-Me: ERROR no voices available.');
    return;
  }
  
  // Try to use the preferred voice.
  var firstLocalVoice = null;
  for (var i = 0; i < this.voices.length; i++) {
    if (this.voices[i].name === dyslexiaextension.modules.Tts.PREFERRED_VOICE_NAME && this.voices[i].localService) {
      this.voice = this.voices[i];
      console.log('Read-To-Me: Using preferred voice ' + dyslexiaextension.modules.Tts.PREFERRED_VOICE_NAME + '.');
      break;
    }
    if (!firstLocalVoice && this.voices[i].localService) {
      firstLocalVoice = this.voices[i];
    }
  }
  
  // Otherwise, use the first local voice. Only local voices provide utterance boundary events.
  if (!this.voice) {
    if (!firstLocalVoice) {
      this.voices = this.voices[i];
      this.canHighlightText = false;
      console.log('Read-To-Me: ERROR no local voices available, text highlights disabled.');
    } else {
      this.voice = firstLocalVoice;
      console.log('Read-To-Me: Preferred voice ' + dyslexiaextension.modules.Tts.PREFERRED_VOICE_NAME + ' unavailable. Using ' + this.voice.name + '.');
    }
  }
};


dyslexiaextension.modules.Tts.prototype.renderButton = function() {
  this.buttonEl = document.createElement('div');
  this.buttonEl.id = 'read-to-me-button';
  document.body.appendChild(this.buttonEl);
};

dyslexiaextension.modules.Tts.prototype.attachListeners = function() {
  console.log('Read-To-Me: Attaching listeners');
  
  this.buttonEl.addEventListener('click', function() {
    this.readEl(this.elToRead);
    this.elToRead = null;
    this.hideButton();
  }.bind(this));
  document.body.addEventListener('mousemove', this.handleMouseMove.bind(this));  
  window.addEventListener('scroll', function() {
    if (this.buttonShown) { // Quick bool check.
      this.hideButtonFast();
    }
  }.bind(this));
};

dyslexiaextension.modules.Tts.prototype.cancelListening = function() {
  document.body.removeEventListener('mousemove', this.handleMouseMove.bind(this));
  this.cleanUp();
};


dyslexiaextension.modules.Tts.prototype.handleMouseMove = function(e) {
  // TODO(vagell): Rate limit this handler to improve performance
  var newHoveredEl = document.elementFromPoint(e.clientX, e.clientY);
  if (newHoveredEl === this.lastHoveredEl) {
    return;
  } else {
    this.lastHoveredEl = newHoveredEl;
    var hoveredElAtTimerStart = this.lastHoveredEl;
    window.setTimeout(function() {
      if (this.lastHoveredEl !== hoveredElAtTimerStart &&
        this.lastHoveredEl !== this.buttonEl) {
        // TODO(vagell): Improve this interaciton to remove flicker when rapidly hovering several els.
        this.hideButton();
        return;
      } else {
        var textNode = this.getTextNode(hoveredElAtTimerStart);
        if (textNode) {
          this.showButtonNear(textNode);
        }
      }
    }.bind(this), dyslexiaextension.modules.Tts.HOVER_DURATION_MS);
  }
};


dyslexiaextension.modules.Tts.prototype.hideButton = function() {
  this.buttonEl.style.opacity = 0;
  this.buttonEl.style.pointerEvents = 'none';
  this.buttonShown = false;
};


dyslexiaextension.modules.Tts.prototype.hideButtonFast = function() {
  this.buttonEl.style.display = 'none';
  this.buttonEl.style.opacity = 0;
  this.buttonEl.style.pointerEvents = 'none';
  window.setTimeout(function() {
    this.buttonEl.style.display = '';
    this.buttonShown = false;
  }.bind(this), 0);
};


dyslexiaextension.modules.Tts.prototype.showButtonNear = function(el) {
  var rect = el.parentNode.getBoundingClientRect();
  this.buttonEl.style.left = rect.left + 'px';
  this.buttonEl.style.top = rect.top + (rect.height / 2) + 'px';
  this.buttonEl.style.opacity = 1;
  this.buttonEl.style.pointerEvents = 'auto';
  
  this.elToRead = el;
  
  this.buttonShown = true;
};


dyslexiaextension.modules.Tts.prototype.getTextNode = function(el) {
  if (el.nodeType === Node.TEXT_NODE) {
    return el;
  }
    
  var textNode = null;
  for (var i = 0; i < el.childNodes.length; i++) {
    if (el.childNodes[i].nodeType === Node.TEXT_NODE) {
      return el.childNodes[i];
    }
  }
};


dyslexiaextension.modules.Tts.prototype.readEl = function(el) {
  // Stop an active reading.
  if (this.utterance) {
    this.utterance.onend = function() {
      this.cleanUp();
      this.readEl(el);
    }.bind(this);
    window.speechSynthesis.cancel();
    return;
  }
  
  if (!el) {
    this.hideButton();
    return;
  }
  
  var textNode = this.getTextNode(el);
  console.log(el.nodeType);
  console.log(Node.TEXT_NODE);
  console.log(el);
  // If this element doesn't directly have text, don't read it. Probably a big container.
  if (!textNode) {
    console.log('Read-To-Me: Nothing to read, clicked element and its children have no text nodes.');
    return;
  }
  
  var text = textNode.textContent.trim();
  if (!text || text.length === 0) {
    console.log('Read-To-Me: Nothing to read, clicked element has empty text content.');
    return;
  }
  this.textBeingRead = textNode.textContent;
  this.elBeingRead = textNode;
  
  this.utterance = new SpeechSynthesisUtterance(this.textBeingRead);
  this.utterance.voice = this.voice;
  this.utterance.rate = dyslexiaextension.modules.Tts.VOICE_SPEED;
  this.utterance.onboundary = function(e) {
    this.highlightNextPhrase(e.charIndex);
  }.bind(this);
  this.utterance.onend = function(e) {
    this.cleanUp();
  }.bind(this);
  this.utterance.onerror = function(e) {
    console.log('Read-To-Me: Error while reading.');
    this.cleanUp();
  }.bind(this);
  
  window.speechSynthesis.speak(this.utterance);
};


/**
 * Resets state to prepare for another read() call.
 */
dyslexiaextension.modules.Tts.prototype.cleanUp = function() {
  this.removeHighlights();
  this.elBeingRead = null;
  this.textBeingRead = null;
  this.utterance = null;
  this.elToRead = null;
};


dyslexiaextension.modules.Tts.prototype.removeHighlights = function() {
  if (!this.canHighlightText) {
    return;
  }
  
  // Note that we query for the highlight rather than store reference, in case the
  // user has changed web app state such that it's gone.
  var highlightSpan = document.querySelector('#' + dyslexiaextension.modules.Tts.HIGHLIGHT_ID);
  
  if (!highlightSpan) {
    return;
  }
  
  var parentNode = highlightSpan.parentNode;
  highlightSpan.insertAdjacentHTML('beforebegin', highlightSpan.textContent);
  highlightSpan.remove();
  // TODO(vagell): Figure out why normalize is leaving behind empty text nodes.
  parentNode.normalize();
  
  if (this.utterance) {
    // Reset el being read, since we've mucked with DOM.
    for (var i = 0; i < parentNode.childNodes.length; i++) {
      if (parentNode.childNodes[i].nodeType === Node.TEXT_NODE) {
        this.elBeingRead = parentNode.childNodes[i];
        break;
      }
    } 
  }
};


dyslexiaextension.modules.Tts.prototype.highlightNextPhrase = function(startIdx) {
  if (!this.canHighlightText) {
    return;
  }
  
  if (!this.utterance) {
    console.log('abort at ' + startIdx);
    return;
  }
  
  this.removeHighlights();
  
  var remainingText = this.textBeingRead.substr(startIdx);
  var endIdx = startIdx + remainingText.search(/[ .!?]/);
  endIdx = endIdx < startIdx ? this.textBeingRead.length : endIdx;
  
  var highlightSpan = document.createElement('span');
  highlightSpan.id = dyslexiaextension.modules.Tts.HIGHLIGHT_ID;
  var range = document.createRange();
  range.setStart(this.elBeingRead, startIdx);
  range.setEnd(this.elBeingRead, endIdx);
  range.surroundContents(highlightSpan);
};



var dyslexiaextension = dyslexiaextension || {};

dyslexiaextension.Content = function() {
  this.showing = false;
  //this.font = 'Dyslexia-Extension-OpenDyslexic-Regular';
  this.font = '';
};


dyslexiaextension.Content.prototype.init = function() {
  console.log('Init');
  this.scrappedBody = document.getElementsByTagName('body')[0];
  this.addComposeListener();
  this.container = new autocharlie.ui.Container(this.scrappedBody);
  this.ctrl = new dyslexiaextension.controllers.HomeCtrl(this);
  //this.ctrl.init();
  this.container.header.addFeedbackButton();
  this.container.header.addCloseButton(this.hide.bind(this));
  //this.container.footer.hide();

  chrome.runtime.sendMessage({
          method: dyslexiaextension.constants.Message.GET_INIT
        }, function(response) {
          console.log('Response');
          console.log(response);
          if(response !== '') {
            this.font = response.font;
            this.background = response.background;
            this.reading = response.reading;
            if(this.reading) {
              this.addReading();
            }
            this.insertOntoBody();
          } else {
            this.font = '';
            this.background = '';
            this.reading = '';
          }
        }.bind(this));
  this.addListener();
};

dyslexiaextension.Content.prototype.toggle = function(e) {
  if(e) {
    e.stopPropagation();
  }
  if(this.showing) {
    this.hide();
  } else {
    this.show();
  }
};

dyslexiaextension.Content.prototype.addListener = function() {
  chrome.runtime.onMessage.addListener(function(request) {
    if(request && request.method === 'browserActionClicked'){
      this.toggle();
    }
  }.bind(this));
};

dyslexiaextension.Content.prototype.show = function() {
  this.showing = true;
  this.container.show();
  this.ctrl.init();
};

dyslexiaextension.Content.prototype.hide = function() {
  this.showing = false;
  this.container.hide();
};

dyslexiaextension.Content.prototype.addReading = function() {
  this.readingModule = new dyslexiaextension.modules.Tts();
  this.readingModule.init();
};

dyslexiaextension.Content.prototype.getReading = function() {
  return this.reading;
};

dyslexiaextension.Content.prototype.removeReading = function() {
  if(this.readingModule) {
   this.readingModule.cancelListening();
  }
};

dyslexiaextension.Content.prototype.getEnabled = function() {
  chrome.runtime.sendMessage({
    method: dyslexiaextension.constants.Message.GET_ENABLED
  }, function(response) {
    if(response) {
      this.enabled = response.enabled;
      this.font = response.font;
    } else {
      console.log('Error getting codes, please refresh');
    }
  }.bind(this));
};


dyslexiaextension.Content.prototype.checkLoad = function() {
  document.addEventListener('DOMContentLoaded', this.init.bind(this), false);
};


dyslexiaextension.Content.prototype.insertOntoBody = function() {
  this.insertFontOntoElements(this.scrappedBody);
};

dyslexiaextension.Content.prototype.insertFontOntoElements = function(element) {
  if(element) {
    try {
      this.insertFontOntoElement(element);
      var subElements = element.getElementsByTagName('*');
      for (var i = 0; i < subElements.length; i++) {
        this.insertFontOntoElement(subElements[i]);
      }
    } catch(e) {
      // Do nothing
    }
  }
};

dyslexiaextension.Content.prototype.setFont = function(font) {
  this.font = font;
};

dyslexiaextension.Content.prototype.getFont = function() {
  return this.font;
};

dyslexiaextension.Content.prototype.setBackground = function(background) {
  this.background = background;
};

dyslexiaextension.Content.prototype.getBackground = function() {
  return this.background;
};

dyslexiaextension.Content.prototype.insertFontOntoElement = function(element) {
 var computedStyle = document.defaultView.getComputedStyle(element,null);
  if(element.style) {
    if(this.background !== '') {
      if(computedStyle.backgroundColor === 'rgb(255, 255, 255)') {
        element.style.backgroundColor = this.background;
      }
    }
    if(this.font === '') {
      element.removeAttribute('font-family');
    } else {
      if(this.font === 'Dyslexia-Extension-DyslexicView') {
        //element.style.textTransform = 'uppercase';
      }
      element.style.fontFamily = this.font;
    }
  }
};

dyslexiaextension.Content.prototype.addComposeListener = function() {
  document.addEventListener('DOMNodeInserted', this.subtreeModifed.bind(this), false);
}; //Used to be subtree

dyslexiaextension.Content.prototype.removeFont = function() {
  this.font = '';
  this.insertOntoBody();
};

dyslexiaextension.Content.prototype.removeBackground = function() {
  this.background = '';
  this.insertOntoBody();
};

dyslexiaextension.Content.prototype.subtreeModifed = function(e) {
  var target = e.target;
  if(target) {
   this.insertFontOntoElements(target);
  }
};

var dyslexiaextensionContent = new dyslexiaextension.Content();
dyslexiaextensionContent.init();