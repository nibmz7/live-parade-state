import { SingletonEventDispatcher } from '../../src/util/EventDispatcher.js';
import FakeDb, { CreateUser } from './FakeDb.js';

export default class FakeBranchRepository extends SingletonEventDispatcher {

    constructor() {
        super();
        this.uniqueId = 0;
        this.depCount = 1;
        this.users = {};
        this.departments = {};
        FakeDb.departments.forEach(department => {
            this.depCount++;
            this.departments[department.uid] = department
        });
        let users = FakeDb.users;
        this.changeDate(users[1]);
        this.changeDate(users[2]);
        this.changeDate(users[3]);
        users.forEach(item => {
            let user = this.toUser(item);
            this.users[user.uid] = user;
        });
    }

    getUserByEmail(email) {
        for(let user of Object.values(this.users)) {
            if(user.email === email) return user;
        }
        return null;
    }

    addDepartment(name) {
        this.departments[this.depCount] = { uid: this.depCount, name };
        this.emit('department-event', {
            type: 'added',
            department: this.cloneDepartment(this.departments[this.depCount++])
        });
    }

    updateDepartment(uid, name) {
        this.departments[uid].name = name;
        this.emit('department-event', {
            type: 'modified',
            department: this.cloneDepartment(this.departments[uid])
        });
    }

    async deleteDepartment(departmentid) {
        for (let [uid, user] of Object.entries(this.users)) {
            if(user.departmentid == departmentid) {
                await new Promise(res => setTimeout(res, 500));
                this.emit('user-event', { type: 'removed', user });
                delete this.users[uid];
            }
        }
        this.emit('department-event', { type: 'removed', department: {uid: departmentid} });
        delete this.departments[departmentid];
        if(Object.keys(this.departments).length === 0) {
            this.emit('department-event', { type: 'empty' });
        }
    }

    //emailPrefix, password, name, rank, departmentid, regular
    async createUser(userInfo) {
        await new Promise(res => setTimeout(res, 1000));
        let { emailPrefix, name, rank, departmentid, regular } = userInfo;
        let user = this.toUser(CreateUser(1, departmentid, `${emailPrefix}@test.com`, name, rank, regular));
        this.users[user.uid] = user;
        this.emit('user-event', { type: 'added', user: this.cloneUser(user) });
    }

    //uid, emailPrefix, name, rank, departmentid, regular
    async updateUser(userInfo) {
        await new Promise(res => setTimeout(res, 1000));
        let { uid, emailPrefix, name, rank, departmentid, regular } = userInfo;
        let user = this.users[uid];
        user.email = `${emailPrefix}@test.com`;
        user.name = name;
        user.rank = rank;
        user.departmentid = departmentid;
        user.regular = regular;
        user.fullname = user.rank + ' ' + user.name,
            this.emit('user-event', { type: 'modified', user: this.cloneUser(this.users[uid]) });
    }

    async deleteUser(uid) {
        await new Promise(res => setTimeout(res, 1000));
        this.emit('user-event', { type: 'removed', user: this.users[uid] });
        delete this.users[uid];
    }

    async updateUserStatus(isMorning, status, uid, branchid) {
        await new Promise(res => setTimeout(res, 1000));
        let user = this.users[uid];
        let timeOfDay = isMorning ? 'am' : 'pm';
        user.status[timeOfDay] = { ...status };
        user.status[timeOfDay].expired = false;
        this.emit('user-event', { type: 'modified', user: this.cloneUser(user) });
    }

    cloneUser(user) {
        let clone = JSON.parse(JSON.stringify(user));
        clone.status.am.timestamp = new Date(clone.status.am.timestamp);
        clone.status.pm.timestamp = new Date(clone.status.pm.timestamp);
        return clone
    }

    cloneDepartment(department) {
        return JSON.parse(JSON.stringify(department));
    }

    checkSameDay(statusDate) {
        let date = new Date();
        let dayDifference = statusDate.getDate() - date.getDate();
        let isSameDayBeforeSix = dayDifference === 0 && statusDate.getHours() < 17 && date.getHours() < 17;
        let isSameDayAfterSix = dayDifference === 0 && statusDate.getHours() > 17 && date.getHours() > 17;
        let isPrevDayAfterSix = dayDifference === -1 && statusDate.getHours() > 17 && date.getHours() < 17;
        return date.getFullYear() === statusDate.getFullYear() &&
            date.getMonth() === statusDate.getMonth() &&
            (isSameDayBeforeSix || isSameDayAfterSix || isPrevDayAfterSix);
    }

    toUser(user) {
        let amTimestamp = user.status.am.timestamp;
        let pmTimestamp = user.status.pm.timestamp;
        let amIsExpired = false;
        let pmIsExpired = false;
        if (amTimestamp && pmTimestamp) {
            amIsExpired = !this.checkSameDay(amTimestamp);
            pmIsExpired = !this.checkSameDay(pmTimestamp);
        }
        user.status.am.expired = amIsExpired;
        user.status.pm.expired = pmIsExpired;

        return {
            uid: `user-${this.uniqueId++}`,
            fullname: user.rank + ' ' + user.name,
            ...user
        }
    }

    changeDate(user) {
        user.status.am.timestamp = new Date("May 17, 2020 21:15:00");
        user.status.pm.timestamp = new Date("May 17, 2020 21:15:00");
    }

    async subscribe(branchid) {
        await new Promise(res => setTimeout(res, 1500));
        let users = Object.values(this.users).map(user => this.cloneUser(user));
        let departments = Object.values(this.departments).map(department => this.cloneDepartment(department));
        this.emit('department-event', { type: 'found', departments });
        this.emit('user-event', { type: 'found', users });
    }

    unsubscribe() { }

}
FakeBranchRepository.instance = null;