'use strict';

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