import { cardStyle, listItemStyle } from '../../util/GlobalStyles.js';
import Utils from '../../util/Utils.js';

const template = `
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
        
            #strength {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 10 px;
              font-weight: 900;
              background: #34495e;
              color:white;
            }

    </style>
    
    ${listItemStyle}
    
    <div class="container">
         <h3 id="header"></h3>
        <div class="card">
            <div id="strength">0 Present</div>
            <div id="list"></div>
        </div>
    </div>
    
`;
         

export default class DepartmentPage extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = template;
    
  }
}