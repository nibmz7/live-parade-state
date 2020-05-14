import {fadeAnim} from './GlobalStyles.js';
import {BaseElement, html} from "./base/BaseElement.js";

const template = html`

    <style>
        #root {
            height: 100%;
            width: 100%;
        }
        #container {
            height: 100%;
            width: 100vw;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 100%;
            grid-template-areas: "content";
            align-items: center;
        }

        #container:empty + .loading {
            display: block;
        }

        #container > * {
            grid-area: content;
            justify-self: center;
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

        ${fadeAnim(500, 500)}
    </style>

    <div id="root">
        <div id="container"></div>
    </div>
`;

const ids = ['root','container'];

export default class ViewSwitcher extends BaseElement {

    constructor() {
        super();
        this.render(this.shadowRoot, template, ids);
        this.hasShownFirstScreen = false;
    }

    removeView(view) {
        this.animate(view, 'fade-out', () => {
            view.remove();
        });
    }

    addView(view) {
        if (!this.hasShownFirstScreen) {
            this.hasShownFirstScreen = true;
            let splashscreen = document.getElementById('splashscreen');
            this.animate(splashscreen, 'fade-out', () => {
                splashscreen.remove();
            });
            let div = document.createElement('div');
            div.className = 'loading';
            this.animate(view, 'fade-in', () => {
                view.classList.remove('fade-in');
                this.views.root.appendChild(div);
            });
            this.views.container.appendChild(view);
        } else {
            this.animate(view, 'fade-in', () => {
                view.classList.remove('fade-in');
            });
            this.views.container.appendChild(view);
        }
    }

} 
