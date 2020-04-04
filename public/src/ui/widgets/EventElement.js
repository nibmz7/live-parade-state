export default class EventElement extends HTMLElement {

    constructor() {
        super();
    }

    on(type, listener) {
        this.addEventListener(type, listener);
    }

    emit(type, data) {
        if(data) {
            this.dispatchEvent(new CustomEvent(type, {detail: data}));
        } else this.dispatchEvent(new Event(type));
    }
}