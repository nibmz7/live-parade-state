import {inputStyle} from '../../widgets/Dialogue.js';
import Dialogue from '../../widget/Dialogue.js';

const template = `
    <style>
        ${inputStyle}
    </style>

    <div>

    </div>
`;

export default class EditDepartment extends Dialogue {

    constructor() {
        super(template);
    }
}