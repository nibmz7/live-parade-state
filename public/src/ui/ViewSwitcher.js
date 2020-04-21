import Utils from "../util/Utils.js";

const template = `

    <style>
        #root {
            height: 100%;
            width: 100%;
        }
        .container {
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-areas: "content";
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

        .fade-in {
            animation: fade-in 0.5s;
          }
          
          .fade-out {
            animation: fade-out 0.3s;
          }
          
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          @keyframes fade-out {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }

        .container > * {
            grid-area: content;
            justify-self: center;
        }
    </style>

    <div id="root">
        <div class="container"></div>
    </div>
`;

export default class ViewSwitcher extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        this.root = this.shadowRoot.getElementById('root');
        this.container = this.shadowRoot.querySelector('.container');
        this.hasShownFirstScreen = false;
    }

    removeView(view) {
        Utils.animate(view, 'fade-out', () => {
            view.remove();
        });
    }

    addView(view) {
        if (!this.hasShownFirstScreen) {
            this.hasShownFirstScreen = true;
            let splashscreen = document.getElementById('splashscreen');
            Utils.animate(splashscreen, 'fade-out', () => {
                splashscreen.remove();
            });
            let div = document.createElement('div');
            div.className = 'loading';
            Utils.animate(view, 'fade-in', () => {
                view.classList.remove('fade-in');
                this.root.appendChild(div);
            });
            this.container.appendChild(view);
        } else {
            Utils.animate(view, 'fade-in', () => {
                view.classList.remove('fade-in');
            });
            this.container.appendChild(view);
        }
    }

} 
