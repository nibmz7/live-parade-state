import Utils from '../../util/Utils.js';
import { fadeAnim, scaleAnim } from '../GlobalStyles.js';

const template = content => `
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
            backdrop-filter: blur(2px);
            overflow: hidden;
            z-index: 98;
            box-sizing: border-box;
            padding: 0 15px;
            background: rgba(0,0,0,.2);
        }

        #dialogue {
            background: white;
            border-radius: 5px;
            box-shadow: 0px 4px 4px rgba(0,0,0,.25);
            padding: 15px 20px;
            box-sizing: border-box;
            width: 100%;
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
    
        <div id="dialogue">
            ${content}
        </div>
        
    </div>
`;

export default class Dialogue extends HTMLElement {

    constructor(content) {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template(content);
        this.isCancelleable = true;
        this.disabled = true;
        this.root = this.shadowRoot.getElementById('root');
        let dialogue = this.shadowRoot.getElementById('dialogue');

        Utils.animate(this.root, 'show', () => {
            this.root.classList.remove('show');
            Utils.onclick(this.root, e => {
                if(this.isCancelleable) this.close();
            });
            Utils.onclick(dialogue, e => {
                e.stopPropagation();
            });
        });
    }

    close() {
        Utils.animate(this.root, 'hide', () => {
            this.remove();
        });
    }

}