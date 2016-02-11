function $ (_this) {
    return new Base(_this);
}

function Base (_this) {
  this.elements = [];
  if (_this != undefined) {
    this.elements[0] = _this;
  }
}

Base.prototype.getId = function (id) {
  this.elements.push(document.getElementById(id));
  return this;
}

Base.prototype.getTag = function (tag) {
  var tags = document.getElementsByTagName(tag);
  for (var i = 0; i < tags.length; i++) {
    this.elements.push(tags[i]);
  }
  return this;
}

Base.prototype.getClass = function (className, id) {
  var node = null;
  if (arguments == 2) {
    node = document.getElementById(id);
  } else {
    node = document;
  }
  var all = node.getElementsByTagName('*');
  for (var i = 0; i < all.length; i++) {
    if (all[i].className == className) {
      this.elements.push(all[i]);
    }
  }
  return this;
}

Base.prototype.getElement = function (num) {
  var element = this.elements[num];
  this.elements = [];
  this.elements[0] = element;
  return this;
}



Base.prototype.css = function (attr, value) {
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 1) {
      return getStyle(this.elements[i],attr);
    }
    this.elements[i].style[attr] = value;
  }
  return this;
}

Base.prototype.html = function (str) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].innerHTML = str;
  }
  return this;
}

Base.prototype.addClass = function (className) {
  for (var i = 0; i < this.elements.length; i++) {
    if (!hasClass(this.elements[i],className)) {
      this.elements[i].className += ' ' + className;
    }
  }
  return this;
}

Base.prototype.removeClass = function (className) {
  for (var i = 0; i < this.elements.length; i++) {
    if (hasClass(this.elements[i],className)) {
      this.elements[i].className = this.elements[i].className.replace((new RegExp ('(\\s|^)' +className+ '(\\s|$)')), ' ');
    }
  }
  return this;
}

Base.prototype.click = function (fn) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onclick = fn;
  }
  return this;
}

Base.prototype.hover = function (over, out) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onmouseover = over;
    this.elements[i].onmouseout = out;
  }
  return this;
}

Base.prototype.show = function () {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = 'block';
  }
  return this;
}

Base.prototype.hide = function () {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = 'none';
  }
  return this;
}

Base.prototype.center = function (top, width) {
  var top = (document.documentElement.clientHeight - top) / 2;
  var left = (document.documentElement.clientWidth - width) / 2;
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.top = top + 'px';
    this.elements[i].style.left = left + 'px';
  }
  return this;
}

Base.prototype.resize = function (fn) {
  for (var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i];
    window.onresize = function () {
      fn();
      if (element.offsetLeft > document.documentElement.clientWidth - element.offsetWidth) {
        element.style.left = document.documentElement.clientWidth - element.offsetWidth + 'px';
      }
      if (element.offsetTop > document.documentElement.clientHeight - element.offsetHeight) {
        element.style.top = document.documentElement.clientHeight - element.offsetHeight + 'px';
      }
    }
  }
  return this;
}

Base.prototype.drag = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onmousedown = function (e) {
      var e = getEvent(e);
      var _this = this;
      var diffX = e.clientX - _this.offsetLeft;
      var diffY = e.clientY - _this.offsetTop;
      if (typeof _this.setCapture != 'undefined') {
        _this.setCapture();
      }

      document.onmouseover = function (e) {
        var e = getEvent(e);
        var left = e.clientX - diffX;
        var top = e.clientY - diffY;

        if (left < 0) {
          left = 0;
        } else if(left > document.documentElement.clientWidth - _this.offsetWidth) {
          left = document.documentElement.clientWidth - _this.offsetWidth;
        }

        if (top < 0) {
          top = 0;
        } else if(top > document.documentElement.clientHeight - _this.offsetHeight) {
          top = document.documentElement.clientHeight - _this.offsetHeight;
        }

        _this.style.left = left + 'px';
        _this.style.top = top + 'px';
      }
      document.onmouseup = function () {
        this.onmouseover = null;
        this.onmouseup = null;
        if (typeof _this.releaseCapture != 'undefined') {
          _this.releaseCapture();
        }
      }
    }
  }
  return this;
}
