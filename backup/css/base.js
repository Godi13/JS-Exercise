function $ () {
  return new Base();
}

function Base () {
  this.elements = [];
}


Base.prototype.getId = function (id) {
  this.elements.push(document.getElementById(id));
  return this;
};

Base.prototype.getTag = function (tag) {
  var tags = document.getElementsByTagName(tag);
  for (var i = 0; i < tags.length; i++) {
    this.elements.push(tags[i]);
  }
  return this;
};

Base.prototype.getClassName = function (classname,idName) {
  var node = null;
  if (arguments.length == 2) {
    node = document.getElementById(idName);
  } else {
    node = document;
  }
  var all = node.getElementsByTagName('*');
  for (var i = 0; i < all.length; i++) {
    if (all[i].className == classname) {
      this.elements.push(all[i]);
    }
  }
  return this;
};

Base.prototype.getElement = function (num) {
  var element = this.elements[num];
  this.elements = [];
  this.elements[0] = element;
  return this;
}


Base.prototype.addClass = function (className) {
  for (var i = 0; i < this.elements.length; i++) {
    if(!this.elements[i].className.match(new RegExp ('(\\s|^)' +className+ '(\\s|$)'))) {
      this.elements[i].className += ' ' + className;
    }
  }
  return this;
}

Base.prototype.removeClass = function (className) {
  for (var i = 0; i < this.elements.length; i++) {
    if(this.elements[i].className.match(new RegExp ('(\\s|^)' +className+ '(\\s|$)'))) {
      this.elements[i].className = this.elements[i].className.replace(new RegExp ('(\\s|^)' +className+ '(\\s|$)'), ' ');
    }
  }
  return this;
}

Base.prototype.addRule = function (num, selectorText, cssText, position) {
  var sheet = document.styleSheets[num];
  if (typeof sheet.insertRule != 'undefined') {
    sheet.insertRule(selectorText + '{' + cssText + '}',position);
  } else if (typeof sheet.addRule != 'undefined') {
    sheet.addRule(selectorText,cssText,position);
  }
  return this;
}

Base.prototype.removeRule = function (num, index) {
  var sheet = document.styleSheets[num];
  if (typeof sheet.deleteRule != 'undefined') {
    sheet.deleteRule(index);
  } else if (typeof sheet.reomveRule != 'undefined') {
    sheet.removeRule(index);
  }
  return this;
}

Base.prototype.css = function (attr,value) {
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 1) {
      if (typeof window.getComputedStyle != 'undefined') {
        return window.getComputedStyle(this.elements[i],null)[attr];
      } else if (typeof this.elements[i].currentStyle != 'undefined') {
        return this.elements[i].currentStyle[attr];
      }
    }
    this.elements[i].style[attr] = value;
  }
  return this;
}

Base.prototype.html = function (str) {
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 0) {
      return this.elements[i].innerHTML;
    }
    this.elements[i].innerHTML = str;
  }
  return this;
}

Base.prototype.click = function (fn) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onclick = fn;
  }
  return this;
}
