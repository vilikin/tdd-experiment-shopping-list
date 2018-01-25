class ListItem {
    constructor(name, quantity) {
        if (!name || typeof name !== 'string' || name === '') {
            throw new Error('Item initialized with invalid name');
        }

        this.name = name;

        this.setQuantity(quantity);
    }

    setQuantity(quantity) {
        if (isNaN(quantity) || quantity <= 0) {
            throw new Error('Item initialized with invalid quantity');
        }

        this.quantity = quantity;
    }
}

module.exports = ListItem;