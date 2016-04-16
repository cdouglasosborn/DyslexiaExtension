'use strict';

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