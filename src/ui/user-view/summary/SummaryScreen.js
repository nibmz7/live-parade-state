import { BaseElement, html } from "../../base/BaseElement.js";
import SummaryView from "./SummaryView.js";
import STATUS from "../../../model/Status.js";

const template = html`

    <style>
        #root {
            height: 100%;
            width: 100%;
            position: relative;
            background: #FAF5FA;
            top: 0;
            z-index: 97;
        }

        #close {
            position: absolute;
            bottom: 10px;
            left: 10px;
            --button-font-size: 1rem;
            --button-padding: 7px 15px;
            --button-radius: 35px;
            transform: translateY(150%);
            transition: .3s;
        }

        #export {
            position: absolute;
            bottom: 10px;
            --button-font-size: 1rem;
            left: 45%;
            transform: translateX(-45%) translateY(150%);
            --button-padding: 15px;
            --button-radius: 35px;
            transition: .3s .1s;
        }

        .show > #export {
            transition: .5s .7s;
            transform: translateX(-45%) translateY(0px);
        }
        .show > #close {
            transition: .5s .6s;
            transform: translateY(0px);
        }
        
    </style>

    <div id="root">
        <wc-button id="close">X</wc-button>
        <wc-button id="export">Download file</wc-button>
    </div>

`;

const ids = ['root','close','export'];

const loadingText = 'Using advanced AI algorithms coupled with state-of-the-art data analytics system assembled by world-renowned programmers, to construct and produce a freshly baked spreadsheet for our unit.';

export default class SummaryScreen extends BaseElement {

    constructor() {
        super();
        this.currentTime = 'am';
        this.render(this.shadowRoot, template, ids);
        let amSummaryView = new SummaryView();
        let pmSummaryView = new SummaryView();
        amSummaryView.timeOfDay = 'am';
        pmSummaryView.timeOfDay = 'pm';
        this.views.root.appendChild(amSummaryView);
        this.views.root.appendChild(pmSummaryView);
        this.summaryView = {am: amSummaryView, pm: pmSummaryView};
        this.views.export.onclick = () => {
            this.prepareDownload();
        }
        this.loading = document.createElement('div');
        this.loading.id = 'export-loading';
        this.loading.innerHTML = loadingText;
    }

    show() {
        this.views.root.classList.add('show');
    }

    hide() {
        this.views.root.classList.remove('show');
    }

    setController(controller) {
        this.controller = controller;
        this.summaryView.am.setController(controller);
        this.summaryView.pm.setController(controller);
    }

    setTimeOfDay(isMorning) {
        this.currentTime = isMorning ? 'am' : 'pm';
        this.hiddenTime = isMorning ? 'pm' : 'am';
        this.summaryView[this.currentTime].removeAttribute('hidden');
        this.summaryView[this.hiddenTime].setAttribute('hidden', '');
    }

    addUser(user) {
        this.summaryView.am.addUser(user);
        this.summaryView.pm.addUser(user);
    }

    changeUser(user) {
        const checkIfStatusChanged = timeOfDay => {
            let userBefore = this.controller.getUser(user.uid);
            let status = user.status[timeOfDay];
            let prevStatus = userBefore.status[timeOfDay];
            if (prevStatus.code != status.code) {
                this.summaryView[timeOfDay].removeUser(userBefore);
                this.summaryView[timeOfDay].addUser(user);
            } else {
                let prevRemarksLength = prevStatus.remarks.length;
                let remarksLength = status.remarks.length;
                let remarksChanged = 0;
                if (prevRemarksLength == 0 && remarksLength > 0) remarksChanged = -1;
                if (prevRemarksLength > 0 && remarksLength == 0) remarksChanged = 1;
                this.summaryView[timeOfDay].changeUser(user, remarksChanged);
            }
        }
        checkIfStatusChanged('am');
        checkIfStatusChanged('pm');
    }

    removeUser(user) {
        this.summaryView.am.removeUser(user);
        this.summaryView.pm.removeUser(user);
    }

    prepareDownload() {
        if (this.isExporting) return;
        this.isExporting = true;
        const start = () => {
            this.downloadSpreadsheet();
            this.loading.classList.remove('fade-in');
            setTimeout(() => {
                this.animate(this.loading, 'fade-out', () => {
                    this.loading.remove();
                    this.loading.classList.remove('fade-out');
                    this.isExporting = false;
                });
            }, 3000);
        }
        this.animate(this.loading, 'fade-in', () => {
            if (!this.loadExcelExport) {
                this.loadExcelExport = true;
                let excelScript = document.createElement('script');
                excelScript.src = 'https://cdn.jsdelivr.net/npm/xlsx-populate@1.19.1/browser/xlsx-populate.min.js';
                excelScript.onload = function () {
                    start();
                };
                document.head.appendChild(excelScript);
            } else start();
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
        let strength = this.summaryView[this.currentTime].strengthCount;
        addRow(['SBW PLC Strength', '', '', '']);
        addRow([]);
        addRow(['Date', date]);
        addRow(['Total Strength', `${strength.present}/${strength.total}`]);

        this.summaryView[this.currentTime].views.categories.forEach(
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
                                    let remarks = user.status[this.currentTime].remarks;
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