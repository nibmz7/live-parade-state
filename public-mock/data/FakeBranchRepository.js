import { SingletonEventDispatcher } from '../../src/util/EventDispatcher.js';
import FakeDb from './FakeDb.js';

export default class FakeBranchRepository extends SingletonEventDispatcher {

    constructor() {
        super();
        this.departments = FakeDb.departments;
        let users = FakeDb.users;
        this.changeDate(users[1]);
        this.changeDate(users[2]);
        this.changeDate(users[5]);
        this.uniqueId = 0;
        this.users = users.map(user => this.toUser(user));
    }

    updateUserStatus(isMorning, status, uid, branchid) {
        let timeOfDay = isMorning ? 'am' : 'pm';
        this.users[uid].status[timeOfDay] = { ...status };
        this.emit('user-event', { type: 'modified', user: this.users[uid] });
    }

    checkSameDay(statusDate) {
        let date = new Date();
        let dayDifference = statusDate.getDate() - date.getDate();
        let isSameDayBeforeSix = dayDifference === 0 && statusDate.getHours() < 17 && date.getHours() < 17;
        let isSameDayAfterSix = dayDifference === 0 && statusDate.getHours() > 17 && date.getHours() > 17;
        let isPrevDayAfterSix = dayDifference === -1 && statusDate.getHours() > 17;
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
            uid: this.uniqueId++,
            fullname: user.rank + ' ' + user.name,
            ...user
        }
    }

    changeDate(user) {
        user.status.am.timestamp = new Date("April 21, 2020 01:15:00");
        user.status.pm.timestamp = new Date("April 21, 2020 01:15:00");
    }

    async subscribe(branchid) {
        await new Promise(res => setTimeout(res, 700));
        this.emit('department-event', { type: 'found', departments: this.departments });
        this.emit('user-event', { type: 'found', users: this.users });
    }

    unsubscribe() { }

}
FakeBranchRepository.instance = null;