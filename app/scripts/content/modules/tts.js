'use strict';

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
