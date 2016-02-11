function getStyle (element, attr) {
  if (typeof window.getComputedStyle != 'undefined') {
    return window.getComputedStyle(element,null)[attr];
  } else if (typeof element.currentStyle != 'undefined') {
    return element.currentStyle[attr];
  }
}

function hasClass(element,className) {
  return element.className.match (new RegExp ('(\\s|^)' +className+ '(\\s|$)'))
}

function getEvent (event) {
  return event || window.event;
}
