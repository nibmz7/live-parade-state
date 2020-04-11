import Dialogue from './Dialogue.js';
import Auth from '../../data/Auth.js';
const template = `
  <style>
    
    h4 {
      width: 100%;
    }
    #yes{
      width: 50%;
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
      Auth.getInstance().logout();
      this.close();
    }
  }
};