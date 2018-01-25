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

console.log(`Welcome to shopping list!

Available commands:

- login [name]
Switches user to the name specified. You need to login before doing anything else.

- add [itemName] [itemQuantity]
Adds new item to the users shopping list with specified name and quantity.

- remove [itemName]
Removes specified item from the users shopping list.

- update [itemName] [itemQuantity]
Updates quantity of a specified item on the users shopping list.

- view
Displays contents of the users shopping list.
`);

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

                console.log("Done.");

                break;
            case 'remove':
                throwIfNotLoggedIn();

                if (arguments.length !== 2) {
                    throw new Error('Invalid number of arguments for removing an item');
                }

                currentUser.removeItem(arguments[1]);

                console.log("Done.");

                break;
            case 'update':
                throwIfNotLoggedIn();

                if (arguments.length !== 3) {
                    throw new Error('Invalid number of arguments for updating quantity of an item');
                }

                currentUser.updateItem(arguments[1], arguments[2]);

                console.log("Done.");

                break;
            case 'view':
                throwIfNotLoggedIn();

                const items = currentUser.getItems().map(item => `${item.name}: ${item.quantity}`).join('\n');

                if (items.length === 0) {
                    console.log("No items on the shopping list");
                } else {
                    console.log(items);
                }

                break;
            default:
                console.log("Unknown command");
                break;
        }
    } catch (err) {
        console.log(err.message);
    }
});

function throwIfNotLoggedIn() {
    if (!currentUser) {
        throw new Error('You have to be logged in to use that command');
    }
}