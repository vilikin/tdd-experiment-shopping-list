const User = require('./User');

describe('User module', () => {
    it('should throw error when initialized without name', () => {
        expect(() => {
            new User();
        }).toThrow();
    });

    it('should throw error when initialized with non-string name', () => {
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

    it('should not allow empty string as name', () => {
        expect(() => {
            new User('');
        }).toThrow();
    });

    it('should accept non-empty string as a name', () => {
        const user = new User('vili');

        expect(user).toHaveProperty('name', 'vili');
    });

    it('should initialize list for the user when created', () => {
        const user = new User('vili');

        expect(user).toHaveProperty('list');
    });
});