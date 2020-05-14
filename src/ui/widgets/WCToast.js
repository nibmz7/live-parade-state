import {BaseElement, html} from '../base/BaseElement.js';

const template = html`/*minify-html*/
    <style>
        #root {
            position: absolute;
            background: var(--color-primary);
            z-index: 99;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: center;
            text-align: center;
            bottom: 10px;
            left: 10px;
            right: 10px;
            font-size: 1rem;
            border-radius: 3px;
            white-space: pre-line;
            font-weight: 600;
            box-shadow: 0 0 4px 1px rgba(60, 58, 60, 0.46);
        }

        .slide-up {
            animation: 5s slide-up forwards;
        }

        @keyframes slide-up {
            0% {
                transform: translateY(100%) translateY(10px);
            }
            10% {
                transform: translateY(0px);
            }

            90% {
                transform: translateY(0px);
            }

            100% {
                transform: translateY(100%) translateY(10px);
            }
        }
    </style>

    <div id="root"><slot></slot></div>
/*end*/`;

export default class WCToast extends BaseElement {

    constructor() {
        super();
        this.render(this.shadowRoot, template, ['root']);
        this.animate(this.views.root, 'slide-up', e => {
            this.remove();
        });
    }

}