import Utils from '../util/Utils.js';

const template = `
  <style>
    :host {
        --button-font-size: 1.3rem;
        --button-padding: 15px 10px;
        --button-radius: 5px;
        box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.2), 0 2px 4px -1px rgba(var(--color-primary-rgb), 0.12);
    }

    :host([type="outline"]) > button {
        background: white;
        color: var(--color-primary);
        border: 2px solid;
        border-radius: 2px;
        border-color: var(--color-primary);
    }
    
    :host([type="outline"]) button:active {
        background: rgba(0,0,0,.2);
    }
    
    :host([type="plain"]) > button {
        background: white;
        color: var(--color-primary);
        border-radius: 15px;
    }
    
    :host([type="plain"]) > button:active {
        background: rgba(0,0,0,.1);
    }
    
    button {
        font: inherit;
        font-size: var(--button-font-size);
        padding: var(--button-padding);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        border: 2px solid var(--color-primary);
        border-radius: var(--button-radius);
        color: white;
        background: var(--color-primary);
        width: 100%;
        transition: all .2s;
    }
    
    button:active {
        background: var(--color-primary-dark);
    }
  </style>
  
  <button><slot></slot></button>
`;

export default class WCButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
        let button = this.shadowRoot.querySelector('button');
        
        Utils.onclick(button, e => {
          this.dispatchEvent(new Event("onclick"));
        });
    }

    set onclick(callback) {
        this.addEventListener('onclick', e => callback(e));
    }
}