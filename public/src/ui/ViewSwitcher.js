const template = `

    <style>
        #root {
            height: 100%;
            width: 100%;
        }
        .container {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container:empty + .loading {
            display: block;
        }

        .loading {
            display: none;
            position: absolute;
            width: 40px;
            height: 40px;
            top: 50%;
            left: 50%;
            margin: -20px 0 0 -20px;
            background-color: #333;
            border-radius: 100%;
            animation: sk-scaleout 1.0s infinite ease-in-out;
        }
          
        @keyframes sk-scaleout {
            0% {
                transform: scale(0);
            }

            100% {
                transform: scale(1.0);
                opacity: 0;
            }
        }
    </style>

    <div id="root">
        <div class="container"></div>
        <div class="loading"></div>
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
