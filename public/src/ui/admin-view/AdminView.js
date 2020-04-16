import MainView from '../widgets/MainView.js';

export default class AdminView extends MainView {

    constructor() {
        super();
        this.floatButton.textContent = 'Create department';
    }

    createDepartmentCard() {
        return document.createElement('admin-department-card');
    }

    onFloatButtonClick() {
        let dialogue = document.createElement('edit-department');
        dialogue.setEditMode(false);
        dialogue.setController(this.controller);
        document.body.appendChild(dialogue);
    }

}