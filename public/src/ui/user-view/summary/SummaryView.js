import STATUS, { STATUS_CATEGORY } from "../../../data/Status.js";
import Utils from "../../../util/Utils.js";

const loadingText = 'Using advanced AI algorithms coupled with state-of-the-art data analytics system assembled by world-renowned programmers, to construct and produce a freshly baked spreadsheet for our unit.';

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
            max-height: 99.9%;
            overflow-y: auto;
            box-sizing: border-box;
            padding-bottom: 70px;
            padding-top: 50px;
        }

        .container > .list {
            padding: 0 30px 30px 30px;
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
        .strength-count {
            position: fixed;
            width: 100%;
            top: 0;
            text-align: center;
            padding: 10px 0;
            font-size: 1rem;
            text-transform: uppercase;
            font-weight: 600;
            color: var(--color-primary);
            background: #faf5fab8;
            transition: all .5s;
            backdrop-filter: blur(2px);
            box-shadow: none;
        }
        .elevate {
            box-shadow: 0px 1px 2px 1px #928d8d4f;
        }
    </style>

    <div id="root">
        <div class="container">
            <div class="strength-count"></div>
            <div class="list"></div>
        </div>
        <div class="container" hidden>
            <div class="strength-count"></div>
            <div class="list"></div>
        </div>
        <wc-button id="close">X</wc-button>
        <wc-button id="export">Export to excel</wc-button>
    </div>

`;

export default class SummaryView extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isExporting = false;
        this.timeOfDay = 'am';
        this.shadowRoot.innerHTML = template;
        this.root = this.shadowRoot.getElementById('root');
        this.strengths = this.shadowRoot.querySelectorAll('.strength-count');
        this.containers = this.shadowRoot.querySelectorAll('.container');
        this.containersList = this.shadowRoot.querySelectorAll('.container > .list');
        this.strengthCount = { am: { total: 0, present: 0, current: 0 }, pm: { total: 0, present: 0, current: 0 } };
        this.categoryViews = { am: [], pm: [] };
        Utils.onclick(this.shadowRoot.getElementById('close'), this.closeView.bind(this));
        Utils.onclick(this.shadowRoot.getElementById('export'), this.exportToExcel.bind(this));
        this.containers.forEach((el, idx) => {
            el.onscroll = e => {
                if (el.scrollTop > 0) this.strengths[idx].classList.add('elevate');
                else this.strengths[idx].classList.remove('elevate');
            }
        });
        this.loading = document.createElement('div');
        this.loading.id = 'export-loading';
        this.loading.innerHTML = loadingText;
    }

    setController(controller) {
        this.controller = controller;
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

    toggleTimeOfDay(isMorning) {
        this.timeOfDay = isMorning ? 'am' : 'pm';
        const hideOrShow = view => {
            if (view.hasAttribute('hidden')) view.removeAttribute('hidden');
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
        list.className = 'list';
        div.appendChild(header);
        div.appendChild(list);
        this.categoryViews[timeOfDay][id] = { div, header, list, count: 0, cards: {} };
    }

    addUser(user, timeOfDay) {
        let status = user.status[timeOfDay];
        let code = status.code;
        let category = STATUS[code].category;
        if (!this.categoryViews[timeOfDay][category]) {
            this.createCategory(timeOfDay, category);
        }
        let categoryView = this.categoryViews[timeOfDay][category];
        if (categoryView.count == 0) {
            let idx = timeOfDay == 'am' ? 0 : 1;
            if (category == 0 || category == 1) this.containersList[idx].prepend(categoryView.div);
            else this.containersList[idx].appendChild(categoryView.div);
        }
        if (!categoryView.cards[code]) {
            let summaryCard = document.createElement('summary-card');
            summaryCard.setController(this.controller);
            summaryCard.setStatusName(STATUS[code].fullName);
            summaryCard.timeOfDay = timeOfDay;
            categoryView.cards[code] = summaryCard;
            categoryView.list.appendChild(summaryCard);
        } else {
            if (categoryView.cards[code].uidArray.length == 0) {
                categoryView.list.appendChild(categoryView.cards[code]);
            }
        }
        categoryView.cards[code].addUser(user);
        categoryView.count++;
        categoryView.header.textContent = `${STATUS_CATEGORY[category]} - ${categoryView.count}`;
        this.strengthCount[timeOfDay].total++;
        if (!user.regular && status.code == 1) {
            this.strengthCount[timeOfDay].present++;
            if (status.remarks.length > 0) this.strengthCount[timeOfDay].current++;
        }
        this.updateStrengthCount(timeOfDay);
    }

    changeUser(user, timeOfDay, remarksChanged) {
        let code = user.status[timeOfDay].code;
        let category = STATUS[code].category;
        let card = this.categoryViews[timeOfDay][category].cards[code];
        card.changeUser(user);
        if (!user.regular && code == 1) {
            this.strengthCount[timeOfDay].current += remarksChanged;
            this.updateStrengthCount(timeOfDay);
        }
    }

    removeUser(user, timeOfDay) {
        let code = user.status[timeOfDay].code;
        let category = STATUS[code].category;
        let categoryView = this.categoryViews[timeOfDay][category];
        let card = categoryView.cards[code];
        card.removeUser(user);
        categoryView.count--;
        categoryView.header.textContent = `${STATUS_CATEGORY[category]} - ${categoryView.count}`;
        if (card.uidArray.length == 0) card.remove();
        if (categoryView.count == 0) categoryView.div.remove();
        this.strengthCount[timeOfDay].total--;
        if (!user.regular && code == 1) {
            this.strengthCount[timeOfDay].present--;
            if (user.status[timeOfDay].remarks.length > 0) this.strengthCount[timeOfDay].current--;
        }
        this.updateStrengthCount(timeOfDay);
    }

    updateStrengthCount(timeOfDay) {
        let idx = timeOfDay == 'am' ? 0 : 1;
        let strengthCount = this.strengthCount[timeOfDay];
        let text = `Strength: ${strengthCount.total} ~ Present: ${strengthCount.present}  Current: ${strengthCount.current}`;
        this.strengths[idx].textContent = text;
    }

    exportToExcel() {
        if(this.isExporting) return;
        this.isExporting = true;
        Utils.animate(this.loading, 'fade-in', () => {
            this.loading.classList.remove('fade-in');
            setTimeout(() => {
                Utils.animate(this.loading, 'fade-out', () => {
                    this.loading.remove();
                    this.loading.classList.remove('fade-out');
                    this.isExporting = false;
                });
            }, 1000);
        });
        document.body.appendChild(this.loading);
        this.downloadSpreadsheet();  
    }

    async downloadSpreadsheet() {
        let data = [];
        let count = 0;
        let maxNameLength = 0;
        let maxRemarksLength = 0;
        const getUser = uid => {
            return this.controller.getUser(uid);
        }
        const titleCase = name => {
            return name.toLowerCase().split(' ').map(
                word =>
                    word.charAt(0).toUpperCase() + word.substring(1)
            ).join(' ');
        }
        this.categoryViews[this.timeOfDay].forEach(
            (categoryView, category) => {
                if (categoryView.count > 0) {
                    for (let [code, card] of Object.entries(categoryView.cards)) {
                        let statusCount = card.uidArray.length;
                        if (statusCount > 0) {
                            data.push([]);
                            let start = data.length;
                            for (let uid of card.uidArray) {
                                let user = getUser(uid);
                                let fullname = user.rank + ' ' + titleCase(user.name);
                                if (fullname.length > maxNameLength) maxNameLength = fullname.length;
                                let row = ['', ++count, fullname];
                                if (code == 17 || code == 4) {
                                    let remarks = user.status[this.timeOfDay].remarks;
                                    if (remarks.length > maxRemarksLength) maxRemarksLength = remarks.length;
                                    row.push(remarks.toUpperCase());
                                }
                                data.push(row);
                            }
                            data[start][0] = `*${STATUS[code].fullName}*`;
                        }
                    }
                }
            }
        );

        let date = new Date();
        let month = date.getMonth() + 1;
        let day = String(date.getDate()).padStart(2, '0');
        let year = date.getFullYear();
        let dateText = day + '/' + month + '/' + year;
        let strength = this.strengthCount[this.timeOfDay];
        let header = [
            ["SBW PLC Strength", "", "", ""],
            [],
            ["Date", dateText],
            ["Total Strength", strength.present + '/' + strength.total]
        ];

        let workbook = await XlsxPopulate.fromBlankAsync()
        workbook.sheet(0).name("Attendance sheet");
        workbook.sheet(0).column("A").style({ bold: true, italic: true });
        workbook.sheet(0).column("A").width(21);
        workbook.sheet(0).column("B").width(10);
        workbook.sheet(0).column("C").width(maxNameLength + 5);
        workbook.sheet(0).column("D").width(maxRemarksLength + 5);
        workbook.sheet(0).cell("A1").value((header.concat(data)));

        let blob = await workbook.outputAsync()

        let url = window.URL.createObjectURL(blob);
        let filename = `SBW PARADE STATE ${dateText}.xlsx`;
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        
    }

}