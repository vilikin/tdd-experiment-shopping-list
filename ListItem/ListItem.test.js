const ListItem = require('./ListItem');

describe('ListItem module', () => {
    test('should throw error when initialized with invalid parameters', () => {
        expect(() => {
            new ListItem();
        }).toThrow();

        expect(() => {
            new ListItem('item');
        }).toThrow();

        expect(() => {
            new ListItem(1, 'item');
        }).toThrow();

        expect(() => {
            new ListItem('item', 0);
        }).toThrow();

        expect(() => {
            new ListItem('item', -1);
        }).toThrow();
    });

    test('should initialize both name and quantity according to given parameters', () => {
        const listItem = new ListItem('milk', 2);

        expect(listItem).toHaveProperty('name', 'milk');
        expect(listItem).toHaveProperty('quantity', 2);
    });
});