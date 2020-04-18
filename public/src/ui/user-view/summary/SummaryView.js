import STATUS, { STATUS_CATEGORY } from "../../../data/Status.js";

const template = `

    <style>
        :host {
            
        }
        .root {
            height: 100%;
            width: 100%;
            position: absolute;
            background: #FAF5FA;
            top: 0;
            z-index: 98;
        }
        .container {
            padding: 30px;
            max-height: 100%;
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
        }

        #export {
            position: fixed;
            bottom: 10px;
            --button-font-size: 1rem;
            left: 45%;
            transform: translateX(-45%);
            --button-padding: 15px;
            --button-radius: 35px;
        }
    </style>

    <div class="root">
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
        this.containers = this.shadowRoot.querySelectorAll('.container');
        this.categoryViews = {am: [], pm: []};
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