const readline = require('readline');
const UserList = require('./UserList/UserList');
const User = require('./User/User');
const Item = require('./Item/Item');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const users = new UserList();
let currentUser;

rl.on('line', line => {
    const arguments = line.split(" ");
    const command = arguments[0];

    try {
        switch (command) {
            case 'login':
                const userName = arguments[1];
                let user = users.findUser(userName);

                if (!user) {
                    user = new User(userName);
                    users.addUser(user);
                }

                currentUser = user;

                break;
            case 'add':
                throwIfNotLoggedIn();

                if (arguments.length !== 3) {
                    throw new Error('Invalid number of arguments for adding new item')
                }

                currentUser.addItem(new Item(arguments[1], arguments[2]));

                break;
            case 'remove':
                throwIfNotLoggedIn();

                if (arguments.length !== 2) {
                    throw new Error('Invalid number of arguments for removing an item');
                }

                currentUser.removeItem(arguments[1]);

                break;
            case 'update':
                throwIfNotLoggedIn();

                if (arguments.length !== 3) {
                    throw new Error('Invalid number of arguments for updating quantity of an item');
                }

                currentUser.updateItem(arguments[1], arguments[2]);

                break;
            case 'view':
                throwIfNotLoggedIn();

                console.log(currentUser.getItems().map(item => `${item.name}: ${item.quantity}`).join('\n'));

                break;
        }
    } catch (err) {
        console.log(err.message);
    }
});

function throwIfNotLoggedIn() {
    if (!currentUser) {
        throw new Error('You have to be logged in to add new users');
    }
}