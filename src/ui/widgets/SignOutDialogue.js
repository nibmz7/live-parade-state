import Dialogue from '../base/Dialogue.js';
const template = `
  <style>
    
    h4 {
      width: 100%;
      color: #313131;
      margin-top: 15px;
    }
    #yes{
      --button-font-size: 1rem;
      --button-padding: 10px;
      --button-radius: 3px;
    }
  </style>
  
  <div>
    <h4>Are you sure you want sign out?</h4>
    <wc-button type="solid" id="yes">Yes. I'm positive.</wc-button>
  </div>
`;

export default class SignOutDialogue extends Dialogue {
  
  constructor() {
    super(template);
    this.shadowRoot.getElementById('yes').onclick = e => {
      ApplicationContext.getAuth().logout();
      this.close();
    }
  }
};