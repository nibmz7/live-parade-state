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
  },

  addWelcomeText: name => {
    const welcomeText = document.createElement('h5');
    welcomeText.id = 'welcome-text';
    welcomeText.textContent = `Hi, ${name}!`;
    welcomeText.onclick = e => {
      let signOutDialogue = document.createElement('sign-out');
      document.body.appendChild(signOutDialogue);
    }
    document.body.appendChild(welcomeText);
  }
}

export default Utils;