import Utils from '../../util/Utils.js';
import { fadeAnim, slideAnim } from '../GlobalStyles.js';

const template = content => `
    <style>
        #root {
            position: absolute;
            top: 0;
            left: 0;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-areas: "content";
            justify-items: center;
            align-items: center;
            height: 100%;
            width: 100%;
            opacity: 1;
            z-index: 98;
            backdrop-filter: blur(2px);
            overflow: hidden;
        }

        ${fadeAnim()}

        @keyframes scale-in {
            0% { 
                transform: scale(1.2);
                opacity: 0;
                filter: blur(4px); 
            }
            100% { 
                transform: scale(1);
                opacity: 1;
                filter: blur(0px);
            }
        }
    
        @keyframes scale-out {
            100% { 
                transform: scale(1.2);
                opacity: 0;
                filter: blur(4px);
            }
        }

        div#root.show{
            animation: fade-in .2s;
        }

        div#root.hide  {
            animation: fade-out .4s forwards;
        }

        .show > #dialogue {
            pointer-events: none;
            animation: scale-in ease .4s;
        }
        
        .hide > #dialogue {
            animation: scale-out ease .3s forwards;
        }
        
        #scrim {
            background: rgba(0,0,0,.2);
            grid-area: content;
            height: 100%;
            width: 100%;
        }

        #dialogue {
            grid-area: content;
            background: white;
            border-radius: 5px;
            box-shadow: 0px 4px 4px rgba(0,0,0,.25);
            padding: 15px 20px;
            width: calc(100% - 30px);
            box-sizing: border-box;
        }
        
    </style>

    <div id="root">
  
        <div id="scrim"></div>
    
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
        let scrim = this.shadowRoot.getElementById('scrim');
        let dialogue = this.shadowRoot.getElementById('dialogue');

        Utils.animate(this.root, 'show', () => {
            scrim.onclick = e => {
                if(this.isCancelleable) this.close();
            }
        });
    }

    close() {
        Utils.animate(this.root, 'hide', () => {
            this.remove();
        });
    }

}