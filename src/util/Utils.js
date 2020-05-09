const hasPointerEvent = 'PointerEvent' in window;

const Utils = {
  onclick: function (target, callback) {
    if (hasPointerEvent) {
      target.onpointerup = callback;
    } else {
      target.onclick = callback;
    }
  },

  removeonclick: function (target) {
    if (hasPointerEvent) {
      target.removeEventListener('pointerup');
    } else {
      target.removeEventListener('click');
    }
  },

  animate: function (element, animation, callback) {
    const listener = (e) => {
      element.removeEventListener('animationend', listener);
      callback();
    }
    element.addEventListener('animationend', listener);
    element.classList.add(animation);
  },

  showToast: function (message) {
    let toast = document.createElement('wc-toast');
    toast.textContent = message;
    document.body.appendChild(toast);
  }
}

export default Utils;