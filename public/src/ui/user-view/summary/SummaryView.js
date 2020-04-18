import STATUS, { STATUS_CATEGORY } from "../../../data/Status.js";
import Utils from "../../../util/Utils.js";

const template = `

    <style>
        :host {
            
        }
        #root {
            height: 100%;
            width: 100%;
            position: absolute;
            background: #FAF5FA;
            top: 0;
            z-index: 98;
        }
        .container {
            padding: 30px;
            max-height: 99.9%;
            overflow-y: auto;
            box-sizing: border-box;
            padding-bottom: 80px;
        }
        
        .category {

        }
        .header {
            margin-bottom: 0;
            margin-top: 50px;
        }

        .category:first-child .header {
            margin: 0;
        }

        .list {
            
        }

        #close {
            position: fixed;
            bottom: 10px;
            left: 10px;
            --button-font-size: 1rem;
            --button-padding: 7px 15px;
            --button-radius: 35px;
            transform: translateY(0px);
        }

        #export {
            position: fixed;
            bottom: 10px;
            --button-font-size: 1rem;
            left: 45%;
            transform: translateX(-45%) translateY(0px);
            --button-padding: 15px;
            --button-radius: 35px;
        }

        wc-button {
            transition: .5s all;
        }

        .show {
            animation: fade-in .3s;
        } 
        .show > .container {
            animation: slide-in .3s;
        }
        .show > #export {
            transform: translateX(-45%) translateY(150%);
        }
        .show > #close {
            transform: translateY(150%);
        }

        .hide {
            animation: fade-out .3s;
        } 
        .hide > .container {
            animation: slide-out .3s;
        }
        .hide > #export {
            transform: translateX(-45%) translateY(150%);
        }
        .hide > #close {
            transform: translateY(150%);
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
    </style>

    <div id="root">
        <div class="container">
            
        </div>
        <div class="container" hidden>
            
        </div>
        <wc-button id="close">X</wc-button>
        <wc-button id="export">Export to excel</wc-button>
    </div>

`;

export default class SummaryView extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
        this.root = this.shadowRoot.getElementById('root');
        this.containers = this.shadowRoot.querySelectorAll('.container');
        this.categoryViews = {am: [], pm: []};
        Utils.onclick(this.shadowRoot.getElementById('close'), this.closeView.bind(this));
        Utils.onclick(this.shadowRoot.getElementById('export'), this.exportToExcel.bind(this));
    }

    connectedCallback() {
        Utils.animate(this.root, 'show', () => {
            this.root.classList.remove('show');
        });
    }

    closeView() {
        Utils.animate(this.root, 'hide', () => {
            this.remove();
            this.root.classList.remove('hide');
        });
    }

    exportToExcel() {

    }

    toggleTimeOfDay() {
        const hideOrShow = view => {
            if(view.hasAttribute('hidden')) view.removeAttribute('hidden');
            else view.setAttribute('hidden', '');
        }
        hideOrShow(this.containers[0]);
        hideOrShow(this.containers[1]);
    }

    setController(controller) {
        this.controller = controller;
    }

    createCategory(timeOfDay, id) {
        let idx = timeOfDay == 'am' ? 0 : 1;
        let div = document.createElement('div');
        let header = document.createElement('h2');
        let list = document.createElement('div');
        div.className = 'category';
        header.className = 'header';
        header.textContent = STATUS_CATEGORY[id];
        list.className = 'list';
        div.appendChild(header);
        div.appendChild(list);
        this.categoryViews[timeOfDay][id] = {header, list, cards: []};
        if(id == 0 || id == 1) this.containers[idx].prepend(div);
        else this.containers[idx].appendChild(div);
    }

    addUser(user) {
        const addToList = timeOfDay => {
            let status = user.status[timeOfDay];
            let code = status.code;
            let category = STATUS[code].category;
            if(!this.categoryViews[timeOfDay][category]) {
                this.createCategory(timeOfDay, category);
            }
            let categoryView = this.categoryViews[timeOfDay][category];
            if(!categoryView.cards[code]) {
                let summaryCard = document.createElement('summary-card');
                summaryCard.setController(this.controller);
                summaryCard.setStatusName(STATUS[code].fullName);
                categoryView.cards[code] = summaryCard;
                categoryView.list.appendChild(summaryCard);
            }
            categoryView.cards[code].addUser(user);  
        }
        addToList('am');
        addToList('pm');
    }
}