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

    deleteDepartment(departmentid) {
        this.branchRepository.deleteDepartment(departmentid);
    }

    createUser(user) {
        //emailPrefix, password, name, rank, departmentid, regular
        this.branchRepository.createUser(user);
    }

    updateUser(user) {
        //emailPrefix, name, rank, departmentid, regular
        this.branchRepository.updateUser(user);

    }

    updatePassword(uid, password) {}

    deleteUser(departmentid, uid) {
        this.branchRepository.deleteUser(uid);

    }
}
FakeAdminManager.instance = null;