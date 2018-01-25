const List = require('../List/List');

class User {
    constructor(name) {
        if (!name || typeof name !== 'string') {
            throw new Error('User should have a proper name');
        }

        this.name = name;
        this.list = new List();
    }
}

module.exports = User;