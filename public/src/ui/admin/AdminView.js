import EventElement from '../widgets/EventElement.js';

const template = `
    <style>

    </style>

    <wc-button>Create department</wc-button>
`;

export default class AdminView extends EventElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
        let button = this.shadowRoot.querySelector('wc-button');
        button.onclick = e => {
            let toast = document.createElement('wc-toast');
            toast.textContent = 'This is just a test message';
            document.body.appendChild(toast);
        }
    }
}