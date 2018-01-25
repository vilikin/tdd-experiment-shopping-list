class ListItem {
    constructor(name, quantity) {
        if (!name || typeof name !== 'string' || name === '') {
            throw new Error('ListItem initialized with invalid name');
        }

        if (isNaN(quantity) || quantity <= 0) {
            throw new Error('ListItem initialized with invalid quantity');
        }

        this.name = name;
        this.quantity = quantity;
    }
}

module.exports = ListItem;