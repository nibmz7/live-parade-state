import STATUS, { STATUS_CATEGORY } from "../../../model/Status.js";
import { html, BaseElement } from "../../base/BaseElement.js";

const template = html`

    <style>
        #root {
            max-height: 99.9%;
            overflow-y: auto;
            box-sizing: border-box;
            padding-bottom: 70px;
            padding-top: 50px;
        }

        #root > .list {
            padding: 0 30px 30px 30px;
        }
    
        .category > #header {
            margin-bottom: 0;
            margin-top: 50px;
            font-weight: 500;
        }

        .category:first-child #header {
            margin: 0;
        }
        
        #strength {
            position: fixed;
            width: 100%;
            top: 0;
            text-align: center;
            padding: 10px 0;
            font-size: 1rem;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--color-primary);
            background: #faf5fab8;
            transition: all .5s;
            backdrop-filter: blur(2px);
            box-shadow: none;
        }
        #strength.elevate {
            box-shadow: 0px 1px 2px 1px #928d8d4f;
        }
    </style>

    <div id="root">
        <div id="strength"></div>
        <div id="list"></div>
    </div>

`;

const category_template = html`
    <div class="category">
        <h2 id="header"></h2>
        <div id="cards"></div>
    </div>
`;

const ids = ['root', 'strength', 'list'];

export default class SummaryView extends BaseElement {

    constructor() {
        super();
        this.render(this.shadowRoot, template, ids);
        this.strengthCount = { total: 0, present: 0, current: 0 };
        this.views.categories = {};
        this.views.list.onscroll = e => {
            if (el.scrollTop > 0) this.views.strength.classList.add('elevate');
            else this.views.strength.classList.remove('elevate');
        }
    }

    setController(controller) {
        this.controller = controller;
    }

    createCategory(code) {
        let clone = category_template.get().content.cloneNode(true);
        let div = clone.querySelector('.category');
        let header = clone.getElementById('header');
        let list = clone.getElementById('cards');
        this.views.categories[code] = { div, header, list, count: 0, cards: {} };
        if (code == 0 || code == 1) this.views.list.prepend(clone);
        else this.views.list.appendChild(clone);
    }

    addUser(user) {
        let status = user.status[this.timeOfDay];
        let code = status.code;
        let category = STATUS[code].category;
        if (!this.views.categories[category]) {
            this.createCategory(category);
        }
        let categoryView = this.views.categories[category];
        if (!categoryView.cards[code]) {
            let summaryCard = document.createElement('summary-card');
            summaryCard.setController(this.controller);
            summaryCard.setStatusName(STATUS[code].fullName);
            summaryCard.timeOfDay = this.timeOfDay;
            categoryView.cards[code] = summaryCard;
            categoryView.list.appendChild(summaryCard);
        } 
        categoryView.cards[code].addUser(user);
        categoryView.count++;
        categoryView.header.textContent = `${STATUS_CATEGORY[category]} - ${categoryView.count}`;
        this.strengthCount.total++;
        if (status.code == 1) {
            this.strengthCount.present++;
            if (!user.regular && status.remarks.length == 0) this.strengthCount.current++;
        }
        this.updateStrengthCount();
    }

    changeUser(user, remarksChanged) {
        let code = user.status[this.timeOfDay].code;
        let category = STATUS[code].category;
        let card = this.views.categories[category].cards[code];
        card.changeUser(user);
        if (!user.regular && code == 1) {
            this.strengthCount.current += remarksChanged;
            this.updateStrengthCount();
        }
    }

    removeUser(user) {
        let code = user.status[this.timeOfDay].code;
        let category = STATUS[code].category;
        let categoryView = this.views.categories[category];
        let card = categoryView.cards[code];
        card.removeUser(user);
        categoryView.count--;
        categoryView.header.textContent = `${STATUS_CATEGORY[category]} - ${categoryView.count}`;
        if (card.uidArray.length == 0) {
            card.remove();
            delete categoryView.cards[code];
        }
        if (categoryView.count == 0) {
            categoryView.div.remove();
            delete this.views.categories[category];
        }
        this.strengthCount.total--;
        if (code == 1) {
            this.strengthCount.present--;
            if (!user.regular && user.status[timeOfDay].remarks.length == 0) this.strengthCount.current--;
        }
        this.updateStrengthCount();
    }

    updateStrengthCount() {
        let strengthCount = this.strengthCount;
        let text = `Strength: ${strengthCount.total} ~ Present: ${strengthCount.present}  Fall-in: ${strengthCount.current}`;
        this.views.strength.textContent = text;
    }

    exportToExcel() {
        const startScriptDownload = () => {
            this.downloadSpreadsheet();
            this.loading.classList.remove('fade-in');
            setTimeout(() => {
                Utils.animate(this.loading, 'fade-out', () => {
                    this.loading.remove();
                    this.loading.classList.remove('fade-out');
                    this.isExporting = false;
                });
            }, 3000);
        }
        if (this.isExporting) return;
        this.isExporting = true;
        Utils.animate(this.loading, 'fade-in', () => {
            if (!this.loadExcelExport) {
                this.loadExcelExport = true;
                let excelScript = document.createElement('script');
                excelScript.src = 'https://cdn.jsdelivr.net/npm/xlsx-populate@1.19.1/browser/xlsx-populate.min.js';
                excelScript.onload = function () {
                    startScriptDownload();
                };
                document.head.appendChild(excelScript);
            } else startScriptDownload();
        });
        document.body.appendChild(this.loading);
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
        const getDate = () => {
            let date = new Date();
            let month = date.getMonth() + 1;
            let day = String(date.getDate()).padStart(2, '0');
            let year = date.getFullYear();
            return `${day}/${month}/${year}`
        }
        const addRow = args => data.push(args);

        let date = getDate();
        let strength = this.strengthCount[this.timeOfDay];
        addRow(['SBW PLC Strength', '', '', '']);
        addRow([]);
        addRow(['Date', date]);
        addRow(['Total Strength', `${strength.present}/${strength.total}`]);

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
                                addRow(row);
                            }
                            data[start][0] = `*${STATUS[code].fullName}*`;
                        }
                    }
                }
            }
        );

        let workbook = await XlsxPopulate.fromBlankAsync()
        workbook.sheet(0).name("Attendance sheet");
        workbook.sheet(0).column("A").style({ bold: true, italic: true });
        workbook.sheet(0).column("A").width(21);
        workbook.sheet(0).column("B").width(10);
        workbook.sheet(0).column("C").width(maxNameLength + 5);
        workbook.sheet(0).column("D").width(maxRemarksLength + 5);
        workbook.sheet(0).cell("A1").value(data);

        let blob = await workbook.outputAsync()


        let filename = `SBW PARADE STATE ${date}.xlsx`;

        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        await new Promise(res => setTimeout(res, 500));
        window.URL.revokeObjectURL(url);
        //xlsx file not supported for webshare so this will be put on hold for the time being
        //     let blob = new Blob([data], { type: 'text/csv' });
        //     let filename = `SBW PARADE STATE ${date}.csv`;
        //     let file = new File([blob], filename, { type: 'text/csv' });
        //     let filesArray = [file];

        //     if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        //         navigator.share({
        //             files: filesArray,
        //             url: filename
        //         })
        //             .then(() => console.log('Share was successful.'))
        //             .catch((error) => console.log('Sharing failed', error));
        //         console.log(file);

        //     }

    }

}