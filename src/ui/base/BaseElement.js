const hasPointerEvent = 'PointerEvent' in window;

export function html(strings, ...args) {
    let template = null;
    const get = () => {
        if (!template) {
            let result = [strings[0]];
            args.forEach((arg, i) => {
                result.push(arg, strings[i + 1]);
            });
            template = document.createElement('template');
            template.innerHTML = result.join('');
        }
        return template;
    }
    return { get };
}

export class BaseElement extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.views = {};
    }

    render(view, template, ids) {
        view.appendChild(template.get().content.cloneNode(true));
        if (ids) {
            ids.forEach(id => {
                this.views[id] = this.shadowRoot.getElementById(id);
            });
            const undefinedElements = this.shadowRoot.querySelectorAll(':not(:defined)');
            [...undefinedElements].map(el => customElements.upgrade(el));

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