const template = `
    <style>

    </style>

    <wc-button>Create</wc-button>
`;

export default class AdminView extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }

    bindCreateDepartment(listener) {
        let button = this.shadowRoot.querySelector('wc-button');
        button.onclick = e => {
            listener('Log branch');
        }
    }
}