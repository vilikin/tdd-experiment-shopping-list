const ListItem = require('../Item/Item');

class User {
    constructor(name) {
        if (!name || typeof name !== 'string') {
            throw new Error('User should have a proper name');
        }

        this.name = name;
        this.items = [];
    }

    addItem(item) {
        if (!(item instanceof ListItem)) {
            throw new Error('Item must be an instance of Item');
        }

        if (this.hasItem(item.name)) {
            throw new Error('That item is already on the list, try updating it instead');
        }

        this.items.push(item);
    }

    hasItem(name) {
        return !!this.items.find(item => name === item.name);
    }

    removeItem(name) {
        if (!this.hasItem(name)) {
            throw new Error('There is no item with that name on the list');
        }

        this.items = this.items.filter(item => item.name !== name);
    }

    updateItem(name, quantity) {
        if (!this.hasItem(name)) {
            throw new Error('There is no item with that name on the list');
        }

        this.items.forEach((item, index) => {
            if (item.name === name) {
                this.items[index].setQuantity(quantity);
            }
        });
    }

    getItems() {
        return this.items.map(item => ({
            name: item.name,
            quantity: item.quantity
        }));
    }
}

module.exports = User;