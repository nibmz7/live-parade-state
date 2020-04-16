import MainView from "../widgets/MainView.js";

export default class UserView extends MainView {

    constructor() {
        super();
        this.floatButton.textContent = 'View summary';
    }

    createDepartmentCard() {
        return document.createElement('user-department-card');
    }

    onFloatButtonClick() {
        
    }

}