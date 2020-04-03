const template = `

    <style>

    </style>

    <div class="container">

    </div>
`;

export default class AppRouter extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode : 'open'});
        this.shadowRoot.innerHTML = template;
        this.container = this.shadowRoot.querySelector('.container');
    }

    showView(id, view) {
        view.id = id;
        this.container.appendChild(view);
    }
} 
