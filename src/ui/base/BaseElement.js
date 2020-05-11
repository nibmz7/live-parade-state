const hasPointerEvent = 'PointerEvent' in window;

export default class BaseElement extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.views = {};
    }

    render(view, content, ids) {
        let tmpl = document.createElement('template');
        tmpl.innerHTML = content;
        view.appendChild(tmpl.content.cloneNode(true));
        if (ids) {
            ids.forEach(id => {
                this.views[id] = this.shadowRoot.getElementById(id);
            });
        }
    }

    animate(element, animation, callback) {
        const listener = (e) => {
            element.removeEventListener('animationend', listener);
            callback ? callback() : element.classList.remove(animation);
        }
        element.addEventListener('animationend', listener);
        element.classList.add(animation);
    }

    onclick(target, callback) {
        if (hasPointerEvent) target.onpointerup = callback;
        else target.onclick = callback;
    }

    showToast(message) {
        let toast = document.createElement('wc-toast');
        toast.textContent = message;
        document.body.appendChild(toast);
    }
}