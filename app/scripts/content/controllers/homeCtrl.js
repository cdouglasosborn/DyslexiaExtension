'use strict';

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

