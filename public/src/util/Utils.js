const hasPointerEvent = 'PointerEvent' in window;

const Utils = {
  onclick: function(target, callback) {
    if (hasPointerEvent) {
      target.onpointerup = callback;
    } else {
      target.onclick = callback;
    }
  },

  animate: function(element, animation, callback) {
    const listener = (e) => {
      element.removeEventListener('animationend', listener);
      callback();
    }
    element.addEventListener('animationend', listener);
    element.classList.add(animation);
  }
}

export default Utils;