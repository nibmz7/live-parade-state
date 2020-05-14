import { fadeAnim, scaleAnim } from '../GlobalStyles.js';
import {BaseElement, html} from './BaseElement.js';

const template = html`/*minify-html*/
    <style>
        #root {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-items: center;
            align-items: center;
            height: 100%;
            width: 100%;
            overflow: hidden;
            z-index: 99;
            box-sizing: border-box;
            padding: 0 15px;
            background: rgba(0,0,0,.2);
            backdrop-filter: blur(2px);
            webkit-backdrop-filter: blur(2px);
        }

        #dialogue {
            background: white;
            border-radius: 5px;
            box-shadow: 0px 4px 4px rgba(0,0,0,.25);
            padding: 15px 20px;
            box-sizing: border-box;
            width: 100%;
            transform: perspective(100px) translateZ(0px);
        }

        ${fadeAnim()}
        ${scaleAnim()}

        div#root.show{
            animation: fade-in .5s;
        }

        div#root.hide  {
            animation: fade-out .3s forwards;
        }

        .show > #dialogue {
            pointer-events: none;
            animation: scale-in .5s;
        }
        
        .hide > #dialogue {
            animation: scale-out .3s forwards;
        }
        
    </style>

    <div id="root">
        <div id="dialogue"></div> 
    </div>
/*end*/`;

const ids = ['root', 'dialogue'];

export default class Dialogue extends BaseElement {

    constructor() {
        super();
        this.isCancelleable = true;
        this.render(this.shadowRoot, template, ids);
        let root = this.views.root;
        let dialogue = this.views.dialogue;
        this.animate(root, 'show', () => {
            root.classList.remove('show');
            this.onclick(root, e => {
                if(this.isCancelleable) this.close();
            });
            this.onclick(dialogue, e => {
                e.stopPropagation();
            });
        });
    }

    close() {
        this.animate(this.views.root, 'hide', () => {
            this.remove();
        });
    }

}