const UserService = require('../../src/services/user');
const {User}      = require('../../src/models');


describe('Test the user registration', () => {


    test('It should register the new user', async () => {

        const newUser = await UserService.registerUser({
            name       : 'Mario Blu',
            email      : 'mario@blu.it',
            badgeNumber: "AAAAAA",
            password   : 'password'
        });

        expect(newUser.id).toBeDefined();
    });

    test('Should not register two users with the same email', async () => {
        const existingUser = await User.findOne();

        try {
            await UserService.registerUser({
                name       : 'Mario Blu',
                email      : existingUser.email,
                badgeNumber: "AAAAAA",
                password   : 'password'
            });

            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('email already in use');
        }
    });


});


describe('Test the listing of existing users', () =>{
    test('Should return zero users if no users are registered', async (done) => {
        await User.destroy({where: {}});

        const users = await UserService.getAllUsers();

        expect(users.length).toEqual(0);
        done();
    });

    test('Should return the registered users', (done) => {
        UserService.getAllUsers().then(users => {
            let firstUser = users[0];

            expect(firstUser.name).toEqual('Mario Rossi');
            expect(firstUser.email).toEqual('mario@rossi.it');
            expect(firstUser.badgeNumber).toEqual("000001");

            done();
        });
    });
});