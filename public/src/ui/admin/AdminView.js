import EventElement from '../../widget/EventElement.js';

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
    }

    bindCreateDepartment(listener) {
        let button = this.shadowRoot.querySelector('wc-button');
        // button.onclick = e => {
        //     listener('Log branch');
        // }
    }

    bindCreateUser(listener) {
        let button = this.shadowRoot.querySelector('wc-button');
        button.onclick = e => {
            listener(
                "jimbob", 
                "lol1234", 
                "jim bob", 
                "lcp", 
                "VQYJGNSRt9FHDUjq9R3P"
            );
        }
    }
}