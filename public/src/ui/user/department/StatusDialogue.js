import Dialogue from '../../widgets/Dialogue.js';

const template = `
  <style>
  
  </style>
`;

export default class StatusDialogue extends Dialogue {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;

  }
}