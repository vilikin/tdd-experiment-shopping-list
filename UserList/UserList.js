const User = require('../User/User');

class UserList {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        if (!(user instanceof User)) {
            throw new Error('Users must be instances of User');
        }

        if (!this.findUser(user.name)) {
            this.users.push(user);
        }
    }

    findUser(name) {
        return this.users.find(user => user.name === name);
    }
}

module.exports = UserList;