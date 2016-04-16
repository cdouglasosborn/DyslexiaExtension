'use strict';

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