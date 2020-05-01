import Singleton from "./Singleton.js";

export default class EventDispatcher extends Singleton {

    constructor() {
        super();
        this._listeners = {};
    }
    
    stop(type, listener) {
        let index = this._listeners[type].findIndex(item => item == listener);
        if (index >= 0) this._listeners[type].splice(index, 1);
    }

    emit(type, data) {
      if(!this._listeners[type]) return;
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

    empty() {
        this._listeners = {};
    }
}