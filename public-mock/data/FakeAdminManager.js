import Singleton from "../../src/util/Singleton.js";

export default class FakeAdminManager extends Singleton {
    constructor() {
        super();
    }

    async init(uid, email) {
        this.branchRepository = ApplicationContext.getBranchRepository();
        this.adminid = uid;
        this.email = email;
        this.domain = email.split('@')[1];
    }

    changeBranchName(name) {
    }

    changeDepartmentName(departmentid, name) {
        this.branchRepository.updateDepartment(departmentid, name);
    }

    createDepartment(name) {
        this.branchRepository.addDepartment(name);
    }

    async deleteDepartment(departmentid) {
        await new Promise(res => setTimeout(res, 2000));
        await this.branchRepository.deleteDepartment(departmentid);
    }

    async createUser(user) {
        //emailPrefix, password, name, rank, departmentid, regular
        await new Promise(res => setTimeout(res, 1000));
        let email = `${user.emailPrefix}@${this.domain}`;
        let userByEmail = this.branchRepository.getUserByEmail(email);
        if(!userByEmail) this.branchRepository.createUser(user);
        else throw Error();
    }

    async updateUser(user) {
        //emailPrefix, name, rank, departmentid, regular
        await new Promise(res => setTimeout(res, 1000));
        let email = `${user.emailPrefix}@${this.domain}`;
        let userByEmail = this.branchRepository.getUserByEmail(email);
        if(!userByEmail || userByEmail && userByEmail.uid === user.uid) {
            this.branchRepository.updateUser(user);
        } else throw Error();
    }

    updatePassword(uid, password) {}

    deleteUser(departmentid, uid) {
        this.branchRepository.deleteUser(uid);

    }
}
FakeAdminManager.instance = null;