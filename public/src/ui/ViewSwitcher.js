const template = `

    <style>
        .container {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>

    <div class="container">

    </div>
`;

export default class ViewSwitcher extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode : 'open'});
        this.shadowRoot.innerHTML = template;
        this.container = this.shadowRoot.querySelector('.container');
    }

    showView(id, view) {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.container.appendChild(view);
    }

} 
