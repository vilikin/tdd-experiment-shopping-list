const UserList = require('./UserList');
const User = require('../User/User');

let userList;
let vili = new User('vili');
let erika = new User('erika');

beforeEach(() => {
    userList = new UserList();
});

describe('UserList module', () => {
    test('should have array with 0 users when initialized', () => {
        expect(Array.isArray(userList.users)).toBe(true);

        expect(userList.users).toHaveLength(0);
    });

    test("should only accept instances of User", () => {
        expect(() => {
            userList.addUser("vili");
        }).toThrow();
    });

    test('should add users with different names to the list', () => {
        userList.addUser(vili);
        userList.addUser(erika);

        expect(userList.users).toHaveLength(2);
    });

    test('should not add users with same names to the list twice', () => {
        userList.addUser(vili);
        userList.addUser(vili);

        expect(userList.users).toHaveLength(1);
    });

    test('should be able to find user by name from the list', () => {
        userList.addUser(vili);
        userList.addUser(erika);

        const found = userList.findUser('vili');

        expect(found).toBeInstanceOf(User);
        expect(found).toHaveProperty('name', 'vili');
    });
});