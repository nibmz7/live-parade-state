import Utils from '../../util/Utils.js';

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
            height: 100vh;
            opacity: 1;
            z-index: 99;
        }

        @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    
        @keyframes fade-out {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
    
        @keyframes slide-in {
            0% { transform: translateY(100px); }
            100% { transform: translateY(0px); }
        }
        
        @keyframes slide-out {
            100% { transform: translateY(100px); }
        }

        div#root.show{
            animation: fade-in .2s;
        }

        div#root.hide  {
            animation: fade-out .2s forwards;
        }

        .show > #dialogue {
            animation: slide-in .2s;
        }
        
        .hide > #dialogue {
            animation: slide-out .2s forwards;
        }
        
        #scrim {
            background: rgba(0,0,0,.2);
            grid-area: content;
            height: 100vh;
            width: 100vw;
        }

        #dialogue {
            grid-area: content;
            background: white;
            border-radius: 5px;
            box-shadow: 0px 4px 4px rgba(0,0,0,.25);
            padding: 15px 25px;
            transform: translateY(0px);
            width: calc(100% - 50px);
            box-sizing: border-box;
            margin: 0 30px;
        }
        
        #dialogue.shake {
            animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
        }
        
        @keyframes shake {
           10%, 90% {
              transform: translateX(-1px);
            }
        
           20%, 80% {
              transform: translateX(2px);
            }
        
            30%, 50%, 70% {
              transform: translateX(-4px);
            }
        
            40%, 60% {
              transform: translateX(4px);
            }
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
        this.root = this.shadowRoot.getElementById('root');
        let scrim = this.shadowRoot.getElementById('scrim');
        let dialogue = this.shadowRoot.getElementById('dialogue');

        Utils.animate(this.root, 'show', () => {
            this.root.classList.remove('show');
            scrim.onclick = e => {
                this.close();
            }
        });
    }

    close() {
        Utils.animate(this.root, 'hide', () => {
            this.remove();
        });
    }

}