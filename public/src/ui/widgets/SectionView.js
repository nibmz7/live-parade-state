import { cardStyle } from '../../util/GlobalStyles.js';
import Utils from '../../util/Utils.js';

const template = customStyle => `

    <style>
        ${cardStyle}

        .container {
            padding: 30px;
        }

        .card {
            border-radius: 15px;
        }


        #header {
            color: #828282;
            text-transform: capitalize;
        }

        .header-holder {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    
        #sub-header {
            border-radius: 15px 15px 0 0;
        }

        #sub-header:only-child {
            border-radius: 15px;
        }

        ${customStyle}

    </style>
    
    <div class="container">
        <div class="header-holder">
            <h3 id="header"></h3>
        </div>
        <div class="card">
            <div id="sub-header"></div>
            <div id="list"></div>
        </div>
    </div>

    <style>

        #primary-text {
            text-transform: capitalize;
            color: #323232;
            font-weight: 700;
        }

        #secondary-text {
            color: #878787;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .list-item {
            padding: 10px 15px;
            transition: .3s background;
            cursor: pointer;
        }

        .list-item:active {
            background: #F0F0F0;
        }

        .list-item:first-child {
            border-top: 2px dashed var(--color-primary);
        }

        .list-item:last-child {
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }

        .list-item > p {
            margin: 0;
        }

    </style>
          
    <template id="list-item">
        <div class="list-item">
            <p id="primary-text"></p>
            <p id="secondary-text"></p>
        </div>
    </template>
`;
    

export default class SectionView extends HTMLElement {

    constructor(customStyle) {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template(customStyle);
        this.list = this.shadowRoot.getElementById('list');
        this.headerText = this.shadowRoot.getElementById('header');
        this.subHeaderText = this.shadowRoot.getElementById('sub-header');
    }

    set header(title) {
        this.headerText.textContent = title;
    }

    set subHeader(title) {
        this.subHeaderText.textContent = title;
    }

    setListItemData(item, primaryText, secondaryText) {
        let primaryTextItem = item.querySelector('#primary-text');
        let secondaryTextItem = item.querySelector('#secondary-text');
        primaryTextItem.textContent = primaryText;
        secondaryTextItem.textContent = secondaryText;
    }

    createListItem() {
        let self = this;
        return {
            id: '',
            primaryText: '',
            secondaryText: '',
            onclick: () => {},
            clone: function() {
                let template = self.shadowRoot.getElementById('list-item');
                let clone = template.content.cloneNode(true);
                let item = clone.querySelector('.list-item');
                item.id = this.id;
                self.setListItemData(item, this.primaryText, this.secondaryText);
                Utils.onclick(item, this.onclick);
                return clone;
            }
        }
    }
    
}