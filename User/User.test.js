const User = require('./User');
const Item = require('../Item/Item');

let vili;

beforeEach(() => {
    vili = new User('vili');
});

describe('User module', () => {
    test('should throw error when initialized without name', () => {
        expect(() => {
            new User();
        }).toThrow();
    });

    test('should throw error when initialized with non-string name', () => {
        expect(() => {
            new User(5);
        }).toThrow();

        expect(() => {
            new User(null);
        }).toThrow();

        expect(() => {
            new User(/testregex/);
        }).toThrow();
    });

    test('should not allow empty string as name', () => {
        expect(() => {
            new User('');
        }).toThrow();
    });

    test('should accept non-empty string as a name', () => {
        expect(vili).toHaveProperty('name', 'vili');
    });

    test('should initialize list for the user when created', () => {
        expect(vili).toHaveProperty('items');
    });

    test('should add valid item to the list', () => {
        vili.addItem(new Item('milk', 1));

        expect(vili.getItems().find(item => item.name === 'milk')).not.toBeUndefined();
    });

    test('should throw error if item with same name is added', () => {
        expect(() => {
            vili.addItem(new Item('milk', 1));
            vili.addItem(new Item('milk', 1));
        }).toThrow();
    });

    test('should update quantity when there is already an item with given name', () => {
        vili.addItem(new Item('milk', 2));
        vili.updateItem('milk', 22);

        const item = vili.getItems().find(item => item.name === 'milk');

        expect(item.quantity).toBe(22);
    });

    test('should throw error when attempting to update item that is not on the list', () => {
        expect(() => {
            vili.updateItem('milk', 2);
        }).toThrow();
    });

    test('should throw error when attempting to remove item that is not on the list', () => {
        expect(() => {
            vili.removeItem('milk');
        }).toThrow();
    });

    test('should remove item correctly', () => {
        vili.addItem(new Item('milk', 2));
        vili.removeItem('milk');

        expect(vili.getItems()).toHaveLength(0);
    });
});