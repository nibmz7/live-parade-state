const makeStatus = () => ({
    am: {
        code: 0,
        remarks: '',
        timestamp: new Date(),
        updatedby: 'Admin'
    },
    pm: {
        code: 0,
        remarks: '',
        timestamp: new Date(),
        updatedby: 'Admin'
    }
});

const User = (branchid, departmentid, email, name, rank, regular) => ({
    branchid, departmentid, email, name, rank, regular, status: makeStatus()
});

const Department = (uid, name) => ({
    uid, name
});

const departments = [
    Department(1, 'Manpower Branch'), 
    Department(2, 'Finance Department'), 
    Department(3, 'Signal Wing'), 
    Department(4, 'Logistics')
];

const users = [
    User(1, 1, 'sean@test.com', 'Sean', 'LCP', false),
    User(1, 1, 'john@test.com', 'John', 'PTE', false),
    User(1, 1, 'albert@test.com', 'Albert', 'MAJ', false),
    User(1, 3, 'jim@test.com', 'Jim', 'LTC', false),
    User(1, 3, 'billy@test.com', 'Billy', 'CFC', false),
    User(1, 3, 'paul@test.com', 'Paul', 'CPL', false),
    User(1, 4, 'bob@test.com', 'Bob', 'BG', false),
    User(1, 4, 'mike@test.com', 'Mike', 'CPL', false),
    User(1, 4, 'harry@test.com', 'Harry', 'REC', false)
];

const FakeDb = {departments, users};

export default FakeDb;
export {User as CreateUser};