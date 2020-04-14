import User from "../data/User.js";

export default class UserController {

    constructor() {
        this.isLoaded = false;
        this.usersExist = {};
        this.usersSorted = [];
    }

    onUserEvent = data => {
        let type = data.type;
        let user = data.user;
        let departmentCard = this.adminView.getDepartmentCard(user.departmentid);
        if (type == 'added') {
            if (this.isLoaded) departmentCard.addUser(user);
            else {
                this.users[user.uid] = true;
                this.usersSorted.push(user);
            }
        }
        if (type == 'modified') {
            departmentCard.changeUser(user);
        }
        if (type == 'removed') {
            departmentCard.removeUser(user.uid);
        }
        if (type == 'loaded') {
            this.isLoaded = true;
            this.usersSorted.sort(User.compare);
            for (let user of this.usersSorted) {
                let departmentCard = this.adminView.getDepartmentCard(user.departmentid);
                departmentCard.addUser(user);
            }
        }
    }
}