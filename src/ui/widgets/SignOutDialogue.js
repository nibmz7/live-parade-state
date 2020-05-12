import Dialogue from '../base/Dialogue.js';
import { html } from '../base/BaseElement.js';

const template = html`
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
    <wc-button type="solid" id="confirm">Yes. I'm positive.</wc-button>
  </div>
`;

export default class SignOutDialogue extends Dialogue {
  
  constructor() {
    super();
    let views = this.views;
    this.render(views.dialogue, template, ['confirm']);
    this.onclick(views.confirm, e => {
      ApplicationContext.getAuth().logout();
      this.close();
    });
  }
};