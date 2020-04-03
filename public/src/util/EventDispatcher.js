export default class EventDispatcher {

    constructor() {
        this._listeners = {};
    }
    
    removeEventListener(type, listener) {
        let index = this._listeners[type].findIndex(item => item.listener === listener);
        if (index >= 0) this._listeners.splice(index, 1);
    }

    removeEventListeners() {
        this._listeners = {};
    }

    emit(type, data) {
        this._listeners[type].forEach(
            listener => {
                if (data) listener(data);
                else listener();
            });
    }

    on(type, listener) {
        if (!this._listeners[type]) this._listeners[type] = [];
        this._listeners[type].push(listener);
    }
}